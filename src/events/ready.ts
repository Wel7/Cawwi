import { Client, Events } from "discord.js";
import { BotEvent } from "@/types/types.js";
import { getNewMusic, getChannel, sendMusicArray } from "../utils/music.js"

const event: BotEvent = {
    name:Events.ClientReady,
    once:true,
    async execute(client:Client) {
        console.log(`[${client.user?.tag}] est réveillé`);
        setInterval(()=>{
            getChannel().then(channelsId=>{
                getNewMusic("Hololive", "Music_Cover").then(musicVideos =>{
                    sendMusicArray(client, channelsId, musicVideos)
                })
                getNewMusic("Hololive", "Original_Song").then(musicVideos =>{
                    sendMusicArray(client, channelsId, musicVideos)
                })
                getNewMusic("VShojo", "Music_Cover").then(musicVideos =>{
                    sendMusicArray(client, channelsId, musicVideos)
                })
                getNewMusic("VShojo", "Original_Song").then(musicVideos =>{
                    sendMusicArray(client, channelsId, musicVideos)
                })
            })
        }, 60000)       
    }
}
export default event