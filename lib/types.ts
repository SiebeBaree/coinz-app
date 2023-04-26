export type Item = {
    itemId: string;
    category: string;
    name: string;
    emoteId: string;
    description: string;
    longDescription?: string;
    buyPrice?: number;
    sellPrice?: number;
    multiplier?: number;
    duration?: number;
}

export type Shard = {
    id: number;
    ping: number;
    guildcount: number;
}

export type Cluster = {
    id: number;
    shards: Shard[];
}