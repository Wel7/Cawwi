import { Client } from "discord.js";
import { readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { BotEvent } from "@/types/types.js";

type Event = { default: BotEvent };

const eventsPath = `${dirname(fileURLToPath(import.meta.url))}/../events`;

export default (client: Client) => {
  readdirSync(eventsPath).forEach(async (file) => {
    if (!file.endsWith(".js") && !file.endsWith(".ts")) return;

    const filePath = join(eventsPath, file);
    const { default: event }: Event = await import(`file://${filePath}`);
    event.once
      ? client.once(event.name, (...args) => event.execute(...args))
      : client.on(event.name, (...args) => event.execute(...args));
  });
};