# Cawwi
- [Cawwi](#cawwi)
  - [Who's cawwi](#whos-cawwi)
  - [How to install](#how-to-install)
<center>
    <div>
        <img 
            src="https://media.discordapp.net/attachments/922983369405517824/1209825768293802044/Welle_mais_2.2.png?ex=65e8550c&is=65d5e00c&hm=658b25d3bdcc0fca276d326a2bf34cfc872922c5fdef1aaf5fe9c0909d3c9160&=&format=webp&quality=lossless&width=369&height=657"
            alt = "Cawwi deadbeat - bot pfp">
        <figcaption> Bot's pfp by @MunoPog</figcaption>
    </div>
</center>

## Who's cawwi
Cawwi is a small bot that allows me to stay updated on the latest music/covers released by some VTubers.
This bot use [Holodex](https://holodex.net/)'s API

## How to install
To install Cawwi, clone the project, then create a `.env` file in `/src`. This file must contain : 
```
clientId: Your discord bot client ID
guildId: Your dev guild Id (not useful, will remove it later)
token: Your discord bot token
holoAPI: "https://holodex.net/api/v2/"
apiKey: Your holodex api key
```

Then you can build the bot with `npm run build` and start it manually, or you can start it directly with `npm run start`.
You can also start with pm2 using `npm run start:pm2`