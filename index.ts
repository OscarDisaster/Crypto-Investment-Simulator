import DiscordJS, { Intents } from "discord.js"
import WOKcommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
   intents: [
       Intents.FLAGS.GUILDS,
       Intents.FLAGS.GUILD_MESSAGES
   ]  
})






client.on('ready', () => {
    console.log('The bot is ready!')

    new WOKcommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers:'791684318061527060',
    })


})







client.login(process.env.TOKEN)



