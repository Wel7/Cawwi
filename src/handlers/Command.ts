import { Client, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Command } from "@/types/types.js";
import dotenv from "dotenv";
dotenv.config({ path: `${dirname(fileURLToPath(import.meta.url))}/../.env` });

type CommandWithDefault = { default: Command };

const commands: Command[] = [];
const commandsPath = `${dirname(fileURLToPath(import.meta.url))}/../commands`;

const rest = new REST({ version: "10" }).setToken(process.env.token!);

export default async (client: Client) => {
  // prettier-ignore
  const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command: CommandWithDefault = await import(`file://${filePath}`);
    commands.push(command.default.data.toJSON());
    client.commands.set(command.default.data.name, command.default);
  }

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    const data = await rest.put(Routes.applicationCommands(process.env.clientId!), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${(data as unknown[]).length} application (/) commands.`,
    );
  } catch (error) {
    console.error(error);
  }
};
