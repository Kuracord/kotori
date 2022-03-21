declare module "API" {
    export = API;
    class API {
        static getMe(token: any): Promise<any>;
        static sendMessage(client: any, channelId: any, content: any): Promise<any>;
        static getGuild(guildId: any): Promise<any>;
        static getChannel(channelId: any): Promise<any>;
    }
}
declare module "Gateway" {
    export = Gateway;
    class Gateway {
        constructor(client: any, options: any);
        client: any;
        ws: any;
        send(packet: any): void;
        handlePacket(packet: any): void;
        sendPacket(packet: any): void;
    }
}
declare module "Client" {
    export = Client;
    class Client {
        constructor(token: any, options?: {});
        selfbot: boolean;
        gateway: Gateway;
        messages: any[];
        user: any;
        application_id: any;
        get apiUrl(): any;
        getToken(prefix?: boolean): any;
    }
    import Gateway = require("Gateway");
}
declare module "index" {
    export const Client: {
        new (token: any, options?: {}): import("Client");
    };
    export const API: {
        new (): import("API");
        getMe(token: any): Promise<any>;
        sendMessage(client: any, channelId: any, content: any): Promise<any>;
        getGuild(guildId: any): Promise<any>;
        getChannel(channelId: any): Promise<any>;
    };
}
//# sourceMappingURL=typings.d.ts.map