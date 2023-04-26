import styles from '../styles/Commands.module.css';
import { useState, Fragment } from 'react';
import Image from 'next/image';
import plusIcon from '../public/plus.svg';
import minusIcon from '../public/minus.svg';

interface Command {
    category: string;
    description: string;
    cooldown: number;
    options: CommandOption[];
}

interface CommandsProps {
    commands: Record<string, Command>;
}

interface CommandOption {
    name: string;
    required?: boolean;
    options?: CommandOption[];
}

const categories = {
    all: 'All',
    misc: 'Miscellaneous',
    general: 'General',
    games: 'Games',
    business: 'Business',
    investing: 'Investing',
};

export async function getStaticProps() {
    const data = await import('../lib/data/commands.json', { assert: { type: 'json' } });

    return {
        props: { commands: data.default },
    };
}

export default function CommandsPage({ commands }: CommandsProps) {
    const [category, setCategory] = useState(Object.keys(categories)[0]);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="page-content">
            <div id={styles.commands} className="container">
                <div className="page-title">
                    <h1 className="watermark">Commands</h1>
                    <h1>Commands</h1>
                    <p>You&apos;ll find a comprehensive list of all the available commands for Coinz. We&apos;ve
                        compiled this list to help you quickly and easily access the commands in Coinz effectively.</p>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row flex-wrap gap-3">
                        {Object.keys(categories).map((cat) => <Category category={cat} name={categories[cat]} key={cat}
                                                                        selectedCategory={category}
                                                                        setCategory={setCategory}/>)}
                    </div>

                    <div className={styles.searchInputContainer}>
                        <span className="input-group-text" style={{ background: 'transparent', border: 'none' }}>
                            <Image src="/search.svg" alt="Search" width={20} height={20}/>
                        </span>
                        <input
                            type="text"
                            placeholder="Search commands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                <div className="d-flex flex-column gap-3 mt-4 mb-5">
                    {getCommands(commands, category, searchTerm).map((cmd) => <CommandItem name={cmd}
                                                                                           description={commands[cmd].description}
                                                                                           cooldown={commands[cmd].cooldown}
                                                                                           options={commands[cmd].options}
                                                                                           key={cmd}/>)}
                </div>
            </div>
        </div>
    );
}

interface CategoryProps {
    category: string;
    name: string;
    selectedCategory: string;
    setCategory: (category: string) => void;
}

function Category({ category, name, selectedCategory, setCategory }: CategoryProps) {
    return <button data-category={category}
                   className={`${styles.categorySelect} ${selectedCategory === category ? styles.categorySelected : ''} fw-bold border-0`}
                   onClick={() => setCategory(category)}>{name}</button>;
}

interface CommandItemProps {
    name: string;
    description: string;
    cooldown: number;
    options: CommandOption[];
    isOpened?: boolean;
}

function CommandItem({ name, description, cooldown, options, isOpened = false }: CommandItemProps) {
    const [commandState, setCommandState] = useState(isOpened);

    return (
        <div className={`${styles.commandItem} ${commandState ? styles.opened : ''} d-flex align-items-start gap-3`}
             onClick={() => setCommandState(!commandState)}>
            <div className={styles.plusIcon}>
                <Image src={commandState ? minusIcon : plusIcon} alt="Prefix icon for the command" width={40}
                       height={40}></Image>
            </div>
            <div className="ms-3">
                <h5 className="fw-bold">/{name}</h5>
                <p className={commandState ? styles.commandDescription : ''}>{description}</p>
                {commandState && commandOptionParser(name, options, cooldown)}
            </div>
        </div>
    );
}

function getCommands(commands: Record<string, Command>, category: string, searchTerm: string) {
    if (searchTerm) {
        return Object.keys(commands).filter((command) => command.toLowerCase().includes(searchTerm.toLowerCase().replace('/', '')));
    } else if (category === 'all') {
        return Object.keys(commands);
    } else {
        return Object.keys(commands).filter((command) => commands[command].category === category);
    }
}

function commandOptionParser(name: string, cmdOptions: CommandOption[], cooldown: number) {
    if (cmdOptions.length === 0) return <p>This command has no extra parameters</p>;
    let output = '';

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
                            const brackets = newOptions[j].options[k].required === true ? ['<', '>'] : ['[', ']'];
                            output += ` ${brackets[0]}${newOptions[j].options[k].name}${brackets[1]}`;
                        }

                        if (j < newOptions.length - 1) output += '\n';
                    } else {
                        const brackets = newOptions[j].required === true ? ['<', '>'] : ['[', ']'];
                        output += ` ${brackets[0]}${newOptions[j].name}${brackets[1]}`;
                    }
                }
                output += '\n';
            } else {
                output += `/${name} ${options.name}\n`;
            }
        } else {
            if (!output.startsWith(`/${name}`)) output += `/${name}`;

            const brackets = options.required === true ? ['<', '>'] : ['[', ']'];
            output += ` ${brackets[0]}${options.name}${brackets[1]}`;
        }
    }

    return (
        <>
            <h6 className="fw-bold">Usage</h6>
            <p>
                <code>
                    {output.trim().split('\n').map((e, index) => (
                        <Fragment key={index}>
                            {e}
                            <br/>
                        </Fragment>
                    ))}
                </code>
            </p>
            <h6 className="fw-bold mt-3">Cooldown</h6>
            <p>{msToFormattedTime(cooldown)}</p>
        </>
    );
}

function msToFormattedTime(duration: number): string {
    if (duration === 0) return '5 seconds';

    const days = Math.floor(duration / (60 * 60 * 24));
    const hours = Math.floor((duration % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((duration % (60 * 60)) / 60);
    const seconds = Math.floor(duration % 60);

    let result = '';
    if (days > 0) result += `${days}d `;
    if (hours > 0 || result.length > 0) result += `${hours}h `;
    if (minutes > 0 || result.length > 0) result += `${minutes}m `;
    if (seconds > 0 || result.length > 0) result += `${seconds}s`;
    return result || '0s';
}