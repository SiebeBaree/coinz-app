import styles from '../styles/commands.module.css'
import { useState } from 'react'
import commands from '../lib/data/commands.json'

const categories = {
    misc: "Miscellaneous",
    economy: "Economy",
    games: "Games",
    business: "Business",
    farming: "Farming",
    investing: "Investing"
}

export default function Commands() {
    const [state, setState] = useState("misc");

    return (
        <div id={styles.commands} className="container">
            <div id={styles.pageTitle}>
                <h2>List of all Commands</h2>
                <p>You can find a list of all commands that are in Coinz. Click on any command to get more information.</p>
            </div>

            <div className="d-flex flex-row flex-wrap">
                {Object.keys(categories).map((category) => <Category category={category} name={categories[category]} key={category} state={state} setState={setState} />)}
            </div>

            <div>
                {getCommands(state).map((cmd) => <Command name={cmd} description={commands[cmd].description} options={commands[cmd].options} key={cmd} />)}
            </div>
        </div>
    )
}

function Category({ category, name, state, setState }) {
    return <button data-category={category} className={`${styles.categorySelect} ${state === category ? styles.categorySelected : ""}`} onClick={() => setState(category)}>{name}</button>
}

function getCommands(category: string) {
    return Object.keys(commands).filter(command => commands[command].category === category);
}

function Command({ name, description, options, isOpened = false }) {
    const [commandState, setCommandState] = useState(isOpened);

    return (
        <div className={`${styles.commandItem} ${commandState ? styles.opened : ""}`} onClick={() => setCommandState(commandState => !commandState)} >
            <h4>/{name}</h4>
            <p className={commandState ? styles.commandDescription : ""}>{description}</p>
            {commandState && commandOptionParser(name, options)}
        </div>
    )
}

function commandOptionParser(name: string, cmdOptions: Array<any>) {
    if (cmdOptions.length === 0) return <p>This command has no extra parameters</p>;
    let output = "";

    for (let i = 0; i < cmdOptions.length; i++) {
        const options = cmdOptions[i];

        if (options.options !== undefined) {
            const newOptions = options.options;

            if (newOptions.length > 0) {
                output += `/${name} ${options.name}`;
                for (let j = 0; j < newOptions.length; j++) {
                    if (newOptions[j].options !== undefined && newOptions[j].options.length > 0) {
                        if (j > 0) {
                            output += `/${name} ${options.name} ${newOptions[j].name}`;
                        } else {
                            output += ` ${newOptions[j].name}`;
                        }

                        for (let k = 0; k < newOptions[j].options.length; k++) {
                            let brackets = newOptions[j].options[k].required === true ? ["<", ">"] : ["[", "]"];
                            output += ` ${brackets[0]}${newOptions[j].options[k].name}${brackets[1]}`;
                        }

                        if (j < newOptions.length - 1) output += "\n";
                    } else {
                        let brackets = newOptions[j].required === true ? ["<", ">"] : ["[", "]"];
                        output += ` ${brackets[0]}${newOptions[j].name}${brackets[1]}`;
                    }
                }
                output += "\n";
            } else {
                output += `/${name} ${options.name}\n`;
            }
        } else {
            if (!output.startsWith(`/${name}`)) output += `/${name}`;

            let brackets = options.required === true ? ["<", ">"] : ["[", "]"];
            output += ` ${brackets[0]}${options.name}${brackets[1]}`;
        }
    }

    return (
        <>
            <h5>Usage</h5>
            <p>
                <code>{output.trim().split("\n").map(e => <>{e}<br /></>)}</code>
            </p>
        </>
    );
}