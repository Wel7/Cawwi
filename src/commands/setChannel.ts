import { SlashCommandBuilder, ChannelType} from "discord.js";
import { Command } from "@/types/types.js";
import { SlashCommandChannelOption } from "discord.js";
import { setChannel } from "../utils/music.js";


const command:Command = {
    data: new SlashCommandBuilder()
    .setName('setchannel')
    .setDescription('Choose the channel the bot will send the music')
    .addChannelOption((option:SlashCommandChannelOption) =>
        option.setName("channel")
            .setDescription("The channel the bot will send the music")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
    ),

async execute(interaction) {
    const channel = interaction.options.getChannel("channel")!.id;
    const guild = interaction.guild!.id;
    try{
        setChannel(guild, channel)
    }
    catch{
        await interaction.reply({content:"Il y a eu une erreur !", ephemeral:true});
    }
    await interaction.reply({content:"Done !", ephemeral:true});

},
}
// 


export default command