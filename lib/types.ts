export type User = {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
}

interface IPremium {
    active: boolean;
    expires: number;
    tier: number;
}

export type Member = {
    id: string;
    wallet: number;
    bank: number;
    bankLimit: number;
    tickets: number;
    experience: number;
    profileColor: string;
    birthday: Date;
    bio: string;
    premium: IPremium;
}

export type Premium = {
    id: string;
    userTier: number;
    guildTier: number;
    userExpires: number;
    guildExpires: number;
    guildsActivated: string[];
}

export type Cart = {
    id: string;
    quantity: number;
}