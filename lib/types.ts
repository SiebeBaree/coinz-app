export type Shard = {
    id: number;
    ping: number;
    guildcount: number;
}

export type Cluster = {
    id: number;
    shards: Shard[];
}