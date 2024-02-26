import {
  SlashCommandBuilder,
  Collection,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  PermissionResolvable,
} from "discord.js";
import { z } from 'zod'


/**
 * Merci pywos https://github.com/Pyrospower
 */
export interface Command {
  data: SlashCommandBuilder | any;
  name?: string;
  execute: (interaction: ChatInputCommandInteraction) => void;
  autocomplete?: (interaction: AutocompleteInteraction) => void;
  permissions?: Array<PermissionResolvable>;
  aliases?: Array<string>;
}

export interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
  }
}

const envVariables = z.object({
  clientID: z.string(),
  guildId: z.string(),
  token: z.string(),
  holoAPI: z.string(),
  apiKey: z.string()
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
      interface ProcessEnv extends z.infer<typeof envVariables>{}
  }
}

export interface MusicVideo {
  id: string;
  title: string;
  type: "stream" | "clip";
  topic_id?: string;
  published_at?: string;
  available_at: string;
  duration: number;
  status: "new" | "upcoming" | "live" | "past" | "missing";
  songCount: number;
  channel: Channel;
}

export interface Channel {
  id: string;
  name: string;
  org?: string;
  suborg?: string;
  type?: string;
  photo: string;
  english_name: string;
}
