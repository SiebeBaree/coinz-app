import styles from '../styles/Items.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Fuse from 'fuse.js';
import connect from '../lib/database';
import ItemModel, { Item } from '../lib/models/Item';

export async function getStaticProps() {
    await connect();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const shop = await ItemModel.find({}) as Item[];

    return {
        props: {
            shop: JSON.parse(JSON.stringify(shop)),
        },
        revalidate: 300,
    };
}

export default function ItemsPage({ shop }: { shop: Item[] }) {
    const categoryCards = [
        {
            name: 'All Items',
            category: 'all',
        },
        {
            name: 'Tools',
            category: 'tools',
        },
        {
            name: 'Crops',
            category: 'crops',
        },
        {
            name: 'Animals',
            category: 'animals',
        },
        {
            name: 'Fish',
            category: 'fish',
        },
        {
            name: 'Factory Products',
            category: 'factory',
        },
        {
            name: 'Rare Items',
            category: 'rare_items',
        },
        {
            name: 'Other',
            category: 'other',
        },
    ];

    const [items, setItems] = useState(shop);
    const [category, setCategory] = useState('all');
    const [item, setItem] = useState(shop[0]);
    const [query, setQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<Item[]>(items);

    const fuse = new Fuse(items, {
        keys: ['name', 'itemId'],
    });

    function getItems(cat: string, searchQuery?: string): void {
        let newItems = items;

        if (cat !== 'all') {
            newItems = newItems.filter((shopItem) => shopItem.category === cat);
        }

        if (searchQuery) {
            const searchResults = fuse.search(searchQuery);
            newItems = searchResults.map((result) => result.item);
        }

        setSelectedItems(newItems);

        if (newItems.length === 0) {
            setItem(null);
            return;
        }

        if (item !== newItems[0]) {
            setItem(() => newItems[0]);
        }
    }

    useEffect(() => {
        getItems(category, query);
    }, [category, query]);

    return (
        <div className="page-content">
            <div className="container">
                <div className="page-title">
                    <h1 className="watermark">Shop Items</h1>
                    <h1>Shop Items</h1>
                    <p>You&apos;ll find a complete list of all the items available for purchase with your hard-earned
                        money.</p>
                </div>

                <div className={`${styles.selectMenu} d-flex justify-content-between`}>
                    <div className={`${styles.categories} d-flex flex-wrap`}>
                        {categoryCards.map((card) => (
                            <CategoryCard key={card.category} name={card.name}
                                          category={card.category} state={category} setState={setCategory}
                                          getItems={getItems}/>
                        ))}
                    </div>

                    <div className={`${styles.searchInputContainer}`}>
                        <span className="input-group-text" style={{ background: 'transparent', border: 'none' }}>
                            <Image src="/search.svg" alt="Search" width={20} height={20}/>
                        </span>
                        <input
                            type="text"
                            placeholder="Search commands..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                <div className={`${styles.items} mt-4 mb-5 d-flex align-items-start justify-content-between`}>
                    <div className={`${styles.itemHeader} d-flex flex-wrap`}>
                        {selectedItems.map((shopItem) => (
                            <ItemCard key={shopItem.itemId} item={shopItem} state={item} setState={setItem}/>
                        ))}
                    </div>

                    {item && (
                        <div className={styles.itemCard}>
                            <div className="d-flex gap-4 align-items-center">
                                <div className="position-relative">
                                    <Image
                                        src={`https://cdn.discordapp.com/emojis/${item.emoteId}.webp?size=96&quality=lossless`}
                                        alt="Shop Item Icon" width={96} height={96} className={styles.imgGlow}/>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <h1 className="m-0">{item.name}</h1>
                                    <div className="d-flex flex-column gap-1">
                                        <p className="m-0"><b>Item ID:</b> <code>{item.itemId}</code></p>
                                        <p className="m-0"><b>Category:</b> <code>{item.category}</code></p>
                                    </div>
                                </div>
                            </div>

                            <p className={`${styles.description} mt-4 py-1 ps-3`}>{item.longDescription ?? item.description}</p>

                            <div className="d-flex justify-content-around gap-3">
                                <div className="d-flex flex-column justify-content-center gap-2">
                                    <h3>Buy Price</h3>
                                    <div className="d-flex gap-2 justify-content-center">
                                        {item.buyPrice ? (
                                                <>
                                                    <Image
                                                        src="https://cdn.discordapp.com/emojis/987800268223709254.webp?size=24&quality=lossless"
                                                        alt="Coinz Currency" width={24} height={24}/>
                                                    <p>{item.buyPrice}</p>
                                                </>) :
                                            <p>Not Buyable</p>
                                        }
                                    </div>
                                </div>

                                <div className="d-flex flex-column justify-content-center gap-2">
                                    <h3>Sell Price</h3>
                                    <div className="d-flex gap-2 justify-content-center">
                                        {item.sellPrice ? (
                                                <>
                                                    <Image
                                                        src="https://cdn.discordapp.com/emojis/987800268223709254.webp?size=24&quality=lossless"
                                                        alt="Coinz Currency" width={24} height={24}/>
                                                    <p>{item.sellPrice}</p>
                                                </>) :
                                            <p>Not Sellable</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function CategoryCard({ name, category, state, setState, getItems }) {
    return (
        <button className={`${styles.category} border-0`} data-selected={state === category ? 'true' : 'false'}
           data-category={category} onClick={() => {
            setState(category);
            getItems(category);
        }
        }>{name}</button>
    );
}

function ItemCard({ item, state, setState }: { item: Item, state: Item, setState: Dispatch<SetStateAction<Item>> }) {
    return (
        <div className={styles.item} data-selected={item.itemId === state.itemId ? 'true' : 'false'}
             onClick={() => setState(item)}>
            <Image src={`https://cdn.discordapp.com/emojis/${item.emoteId}.webp?size=56&quality=lossless`}
                   alt={item.name} width={56} height={56}/>
        </div>
    );
}