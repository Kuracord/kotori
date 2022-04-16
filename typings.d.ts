declare interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    flags?: number;
    public_flags: number;
    bot?: boolean;
    bio?: string;
    pronouns?: string;
}
declare interface Attachment {
    id: string;
    width?: number;
    height?: number;
    url: string;
    size: number;
    proxy_url: string;
    filename: string;
    cotnent_type: string;
}
declare interface Embed {
    // TODO
}
declare interface Message {
    id: string;
    type: number;
    content?: string;
    channel_id: string;
    guild_id?: string;
    attachments: Attachment[];
    mentions: User[];
    mention_roles: string[];
    mention_everyone: boolean;
    member: Member;
    flags: number;
    embeds: Embed[];
    timestamp: string | Date;
    edited_timestamp: string | Date;
}
declare interface Emoji {
    id: string;
    name: string;
    roles: string[];
    require_colons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
}
declare interface Sticker {
    id: string;
    name: string;
    tags: string;
    type: number;
    format_type: number;
    description: string;
    asset: string;
    guild_id: string;
    available: boolean;
}
declare interface Role {
    id: string;
    name: string;
    permissions: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon?: string;
    unicode_emoji?: string;
}
declare interface Guild {
    id: string;
    name: string;
    icon: string;
    description?: string;
    splash?: string;
    discovery_splash?: string;
    features: string[];
    emojis: Emoji[];
    stickers: Sticker[];
    banner: string;
    owner_id: string;
    application_id?: string;
    region?: string;
    afk_channel_id?: string;
    afk_timeout?: number;
    system_channel_id: string;
    widget_enabled: boolean;
    widget_channel_id?: string;
    verification_level: number;
    roles: Role[];
    default_message_notifications: number;
    mfa_level: number;
    explicit_content_filter: number;
    max_presences?: number;
    max_members: number;
    max_video_channel_users: number;
    vanity_url_code?: string;
    premium_tier: number;
    premium_subscription_count: number;
    system_channel_flags: number;
    rules_channel_id: string;
    public_updates_channel_id: string;
    hub_type?: number;
    premium_progress_bar_enabled: boolean;
    nsfw: boolean;
    nsfw_level: number;
}
declare interface Permission {
    id: string;
    type: number;
    allow: string;
    deny: string;
}
declare interface Channel {
    id: string;
    last_message_id?: string;
    default_auto_archive_duration?: number;
    type: number;
    name: string;
    position: number;
    parent_id?: string;
    topic?: string;
    guild_id: string;
    permission_overwrites: Permission[];
    last_pin_timestamp: string | Date;
    rate_limit_per_user: number;
    nsfw: boolean;
}
declare module "API" {
    export = API;
    class API {
        static getMe(token: string): Promise<User>;
        static sendMessage(client: import("Client"), channelId: string, content: string): Promise<Message>;
        static getGuild(client: import("Client"), guildId: string): Promise<Guild>;
        static getChannel(client: import("Client"), channelId: string): Promise<Channel>;
    }
}
declare module "Gateway" {
    export = Gateway;
    class Gateway {
        constructor(client: import("Client"), options: any);
        client: import("Client");
        ws: any;
        send(packet: any): void;
    }
}
declare module "Client" {
    export = Client;
    class Client {
        constructor(token: string, options?: {});
        selfbot: boolean;
        gateway: Gateway;
        messages: Message[];
        user: User;
        application_id: string;
        get apiUrl(): string;
        getToken(prefix?: boolean): string;
    }
    import Gateway = require("Gateway");
}
declare module "index" {
    export const Client: {
        new (token: string, options?: {}): import("Client");
    };
    export const API: {
        new (): import("API");
        getMe(token: string): Promise<User>;
        sendMessage(client: import("Client"), channelId: string, content: string): Promise<Message>;
        getGuild(client: import("Client"), guildId: string): Promise<Guild>;
        getChannel(client: import("Client"), channelId: string): Promise<Channel>;
    };
}
