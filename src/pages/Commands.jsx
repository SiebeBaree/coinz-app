import { useState } from 'react';

import './style/Commands.css'
import commands from '../assets/data/commands.json'
import Container from 'react-bootstrap/Container'

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
        <Container>
            <div id="page-title">
                <h2>List of all Commands</h2>
                <p>You can find a list of all commands that are in Coinz. Click on any command to get more information.</p>
            </div>

            <div id="categories" className="d-flex flex-row flex-wrap">
                {Object.keys(categories).map((category) => <Category category={category} name={categories[category]} key={category} state={state} setState={setState} root={root} />)}
            </div>

            <div id="commands" state={state}>
                {getCommands(state).map((cmd) => <Command name={cmd} description={commands[cmd].description} cooldown={commands[cmd].cooldown} options={commands[cmd].options} key={cmd} />)}
            </div>
        </Container>
    )
}

function Category({ category, name, state, setState, root }) {
    return <button category={category} className={`category-select${state === category ? " category-selected" : ""}`} onClick={(e) => handleClick(e, category, state, setState, root)}>{name}</button>
}

function handleClick(event, category, state, setState, root) {
    if (state === category) return;

    let categories = document.getElementsByClassName("category-selected");
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].getAttribute("category") !== category) categories[i].classList.remove("category-selected");
    }

    setState(category);
}

function getCommands(category) {
    return Object.keys(commands).filter(command => commands[command].category === category);
}

function Command({ name, description, cooldown, options, isOpened = false }) {
    const [commandState, setCommandState] = useState(isOpened);

    return (
        <div className={`command-item${commandState ? " opened" : ""}`} onClick={(e) => setCommandState(commandState => !commandState)} >
            <h4>/{name}</h4>
            <p className={commandState ? "command-description" : ""}>{description}</p>
            {commandState && commandOptionParser(name, options)}
        </div>
    )
}

function commandOptionParser(name, cmdOptions) {
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