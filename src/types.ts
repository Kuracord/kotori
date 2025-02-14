export interface User {
    flags: number;
    createdAt: Date;
    profile: Profile;
    guilds: Member[];
    token?: string;
    email?: string;
}

export interface Profile {
    bio: string;
    username: string;
    discriminator: string;
    bot: boolean;
    userId: number;
    avatar?: string;
}

export interface Member {
    userId: number;
    user: User;
    guildId: number;
    guild?: Guild;
    owner: boolean;
    joinedAt: Date;
    nickname: string | null;
}

export interface Guild {
    id: number;
    name: string;
    icon?: string;
    flags: number;
    createdAt: Date;
    channels: Channel[];
    members: Member[];
    disabled?: boolean;
}

export enum ChannelType {
    Text = 0,
    Category = 1,
}

export interface Channel {
    name: string;
    description?: string;
    guild?: Guild;
    guildId?: number;
    type: ChannelType;
    parent?: Channel;
    children?: Channel[];
    position: number;
}

export interface Message {
    content?: string;
    author: User;
    flags: number;
    bot: boolean;
    system: boolean;
    authorId: number;
    channelId: number;
    channel?: Channel;
    createdAt: Date;
    editedAt?: Date;
    guildId?: number;
    guild?: Guild;
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string;
    type: string;
    size: number;
    message?: Message;
    messageId: number;
}