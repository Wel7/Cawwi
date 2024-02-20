const { error } = require("console");
const { SlashCommandBuilder, ChannelType } = require("discord.js");
const fs = require("fs");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('setchannel')
        .setDescription('Choose the channel the bot will send the music')
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("The channel the bot will send the music")
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel").id;
        const guild = interaction.guild.id;
        try{
            setChannel(guild, channel)
        }
        catch{
            await interaction.reply({content:"Il y a eu une erreur !", ephemeral:true});
        }
        await interaction.reply({content:"Done !", ephemeral:true});

    },
};

// 
function setChannel(guildID, channelID) {
    const filePath = `./servers/${guildID}.json`;
    fs.writeFile(filePath, JSON.stringify(channelID), (err) => {
        if (err) {
            console.error(err);
            throw error
        }
    });
}
