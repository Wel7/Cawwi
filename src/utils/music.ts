import { MusicVideo } from "@/types/types.js";
import { Client, TextChannel, DMChannel } from "discord.js";
import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export async function getNewMusic(org: string, topic: string) {
  return await axios
    .get(`${process.env.holoAPI}videos`, {
      headers: {
        "X-APIKEY": process.env.apiKey,
      },
      params: {
        topic: topic,
        org: org,
      },
    })
    .then((res) => {
      let musicVideos = new Array<string>();
      res.data.every((video: MusicVideo) => {
        const release = new Date(video.available_at);
        if (
          release < new Date() && release > new Date(Date.now() - 60000)
        ) {
          musicVideos.push(video.id);
        } else if (release < new Date()) {
          console.log(1);
          return true;
        }
      });
      return musicVideos;
    })
    .catch((error) => {
      throw error;
    });
}

export async function sendMusicArray(client: Client, channels:string[], videos:string[]) {
    channels.forEach((channelId) =>{
        const channel = client.channels.cache.get(channelId)
        if(channel instanceof TextChannel || channel instanceof DMChannel){
            videos.forEach((video) => {
                channel.send(`
                https://youtu.be/${video}
                `)
            })
        } else {
            throw new TypeError(`Il y a eu un problème avec l'envoie dans le channel ${channelId}`)
        }
    })
}

export async function getChannel() {
    const serversFolderPath = "./servers";
    if (!fs.existsSync(serversFolderPath)) {
        fs.mkdirSync(serversFolderPath);
    }

    const files = await new Promise<string[]>((resolve, reject) => {
        fs.readdir(serversFolderPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });

    const channels = await Promise.all(
        files.map((file) => {
            return new Promise<string>((resolve, reject) => {
                fs.readFile(`${serversFolderPath}/${file}`, "utf8", (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(content));
                    }
                });
            });
        })
    );

    return channels;
}

export function setChannel(guildID: string, channelID: string) {
  const filePath = `./servers/${guildID}.json`;
  const serversFolderPath = "./servers";
  if (!fs.existsSync(serversFolderPath)) {
    fs.mkdirSync(serversFolderPath);
  }

  fs.writeFile(filePath, JSON.stringify(channelID), (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
}
