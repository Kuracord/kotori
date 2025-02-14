// noinspection JSUnusedGlobalSymbols

import Axios from "axios"
import Client from "./client"
import * as qs from "querystring"
import {Guild, User, Channel, Message} from "./types";
import {staticImplements} from "./utils";

export interface APIInterface {
  fetchUser(): Promise<User>;
  fetchUserId(id: number): Promise<User>;
  fetchGuild(id: number): Promise<Guild>;
  fetchApplications(): Promise<any[]>;
  fetchApplication(id: number): Promise<any>;
  fetchChannel(id: number): Promise<Channel>;
  fetchMessages(id: number, limit: any, before: number): Promise<Message[]>;
  fetchFriends(): Promise<any>;
  discoverUser(tag: string): Promise<User>;
  sendFriendRequest(id: number): Promise<any>;
  createDMChannel(id: number): Promise<any>;
  removeFriendRequest(id: number): Promise<any>;
  sendMessage(id: number, content?: string, files?: Buffer[]): Promise<Message>;
  patchUser(
      avatar?: Buffer,
      username?: string,
      discriminator?: string
  ): Promise<User | undefined>;
  createGuild(name: string): Promise<Guild>;
  createChannel(
      guildId: number,
      name: string,
      description?: string,
      parentId?: number,
      type?: number
  ): Promise<Channel>;
  createApplication(name: string): Promise<any>;
  patchGuildIcon(id: number, icon: Buffer): Promise<Guild>;
  getInvite(code: string): Promise<any>;
  useInvite(code: string): Promise<any>;
  deleteMessage(channelId: number, messageId: number): Promise<boolean>;
  patchMessage(
      channelId: number,
      messageId: number,
      content: string
  ): Promise<Message>;
  createInvite(
      guildId: number,
      channelId: number,
      duration: string,
      limit?: number
  ): Promise<any>;
}


export function register(client: Client) {
  let axios = Axios.create({
    baseURL: "https://api.keneshin.de", // TODO: maybe make constants for endpoints?
    headers: {
      Authorization: client.getToken(),
    },
  });
  @staticImplements<APIInterface>()
  class API {
    static async fetchUser() {
      let { data } = await axios.get("/users/@me", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return data as User;
    }

    static async fetchUserId(id: number) {
      let { data } = await axios.get("/users/" + id);
      return data as User;
    }

    static async fetchGuild(id: number) {
      let { data } = await axios.get("/guilds/" + id);
      return data as Guild;
    }

    static async fetchApplications() {
      let { data } = await axios.get("/applications");
      return data;
    }

    static async fetchApplication(id: number) {
      let { data } = await axios.get("/applications/" + id);
      return data;
    }

    static async fetchChannel(id: number) {
      let { data } = await axios.get("/channels/" + id);
      return data as Channel;
    }

    static async fetchMessages(id: number, limit = 50, before: number) {
      let query = qs.stringify({ limit, before });
      let { data } = await axios.get(`/channels/${id}/messages?${query}`);
      return data as Message[];
    }

    static async fetchFriends() {
      let { data } = await axios.get("/users/@me/relationships");
      return data;
    }

    static async discoverUser(tag: string) {
      let { data } = await axios.post("/users/discoverUser", {
        tag
      });
      return data as User;
    }

    static async sendFriendRequest(id: number) {
      let { data } = await axios.post(`/users/${id}/friendship`);
      return data;
    }

    static async createDMChannel(id: number) {
      let { data } = await axios.post(`/users/${id}/channels`);
      return data;
    }

    static async removeFriendRequest(id: number) {
      let { data } = await axios.delete(`/users/${id}/friendship`);
      return data;
    }

    static async sendMessage(id: number, content?: string, files?: Buffer[]) {
      if (!files && !content) throw new Error("Empty message can't be sent")
      if (files) {
        let form = new FormData();
        for (let file of files) {
          let blob = new Blob([file])
          form.append("attachments", blob)
        }
        if (content) form.append("content", content);
        let { data } = await axios.postForm(`/channels/${id}/messages`, form);
        return data as Message;
      }
      let { data } = await axios.post(`/channels/${id}/messages`, {
        content,
      });
      return data as Message;
    }

    static async patchUser(avatar?: Buffer, username?: string, discriminator?: string) {
      if (!avatar && !username && !discriminator) return;
      let form = new FormData();
      if (avatar) form.append("avatar", new Blob([avatar]));
      if (username) form.append("username", username);
      if (discriminator) form.append("discriminator", discriminator);
      let { data } = await axios.patchForm("/users/@me/profile", form);
      return data as User;
    }

    static async createGuild(name: string) {
      let { data } = await axios.post("/guilds", {
        name,
      });
      return data as Guild;
    }

    static async createChannel(guildId: number, name: string, description?: string, parentId?: number, type?: number) {
      let { data } = await axios.post(`/guilds/${guildId}/channels`, {
        name, description, parent: parentId, type
      });
      return data as Channel;
    }

    static async createApplication(name: string) {
      let { data } = await axios.post("/applications", {
        name,
      });
      return data;
    }

    static async patchGuildIcon(id: number, icon: Buffer) {
      let form = new FormData();
      form.append("icon", new Blob([icon]))
      let { data } = await axios.patchForm(`/guilds/${id}/icon`, form);
      return data as Guild;
    }


    static async getInvite(code: string) {
      let { data } = await axios.get("/invites/" + code);
      return data;
    }

    static async useInvite(code: string) {
      let { data } = await axios.post("/invites/" + code);
      return data;
    }

    static async deleteMessage(channelId: number, messageId: number) {
      let { data } = await axios.delete(`/channels/${channelId}/messages/${messageId}`)
      return !!data;
    }

    static async patchMessage(channelId: number, messageId: number, content: string) {
      let { data } = await axios.patch(`/channels/${channelId}/messages/${messageId}`, {
        content
      })
      return data as Message;
    }

    static async createInvite(guildId: number, channelId: number, duration: string, limit?: number) {
      let { data } = await axios.post(`/channels/${guildId}/${channelId}/invites`, {
        duration, maxUses: limit,
      });
      return data;
    }
  }

  return API;
}
