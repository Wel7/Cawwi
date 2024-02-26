import { readdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Client, Collection, GatewayIntentBits} from 'discord.js';
import { Command } from "./types/types.js";
import dotenv from "dotenv";
dotenv.config({ path: `${dirname(fileURLToPath(import.meta.url))}/.env` });

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection<string, Command>();

const handlersPath = `${dirname(fileURLToPath(import.meta.url))}/handlers`;
readdirSync(handlersPath).forEach(async (handler) => {
  if (!handler.endsWith(".js") && !handler.endsWith(".ts")) return;

  const { default: handlerFct } = await import(
    `file://${handlersPath}/${handler}`
  );
  handlerFct(client);
});


client.login(process.env.token);
