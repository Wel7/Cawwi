import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { Command } from "@/types/types.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config({ path: `${dirname(fileURLToPath(import.meta.url))}/.env` });

const commands: Array<Command> = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = `${dirname(fileURLToPath(import.meta.url))}\\commands`;
const commandFiles = readdirSync(commandsPath).filter(
  (file) => file.endsWith(".js") || file.endsWith(".ts")
);

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
async () => {
  for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    commands.push(command.default.data.toJSON());
  }
};

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(process.env.token!);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(process.env.clientId!), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${
        (data as unknown[]).length
      } application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
