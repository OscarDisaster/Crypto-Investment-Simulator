import { ICommand } from "wokcommands"
import Backendless from 'backendless'
import dotenv from 'dotenv'
import { chekIfUserExists } from "../tools/tools"
import { CryptoBot } from "../interfaces/interfaces";
import { getSolanaPriceinEUR } from "./solprice";
import { ColorResolvable, MessageEmbed } from "discord.js";
dotenv.config()

Backendless.initApp(process.env.BACKENDLESS_APP_ID!, process.env.BACKENDLESS_API_KEY!  )

function embedRedraw(msg:string):MessageEmbed {

    /*
    { "name": "\u200B", "value": "\u200B", "inline":false  },
    { "name": "LEVEL REQUIRED", "value": "All Levels", "inline":true },
    { "name": "LEVEL OBTAINED", "value": "You will get to Level 1", "inline":true },
    { "name": "What we need from you", "value": "Your solana address", "inline":false },
    { "name": "What you'll get", "value": "40 $COOLs.\n\n The first 100 will be given the role of Original Gangster (OG) and will receive 100 additional $COOLs. \n The first 1000 will be whitelisted and will receive additional 50 $COOLs", "inline":false },
    { "name": "If you need help", "value": "If you need help with setting your Solana wallet, you can read the quest documentation by clicking on the quest title.", "inline":false }],

*/
    let embed = new MessageEmbed()
    .setColor('BLUE' as ColorResolvable)
    .setTitle('title')
    .setURL("https://app.gitbook.com/s/y5Q05ZqXpPaJ2HS5kj6z/quests/wallet-quest")
    .setAuthor(
        {
            "name": "Crypto Investment Sim",
            "iconURL": "https://github.com/Cool-oh/Cool-Oh-bot/blob/main/images/Cool-oh-bot.png?raw=true",
            "url": "https://cool-oh.com"
        }
       )
    .setDescription('Description')
    .setThumbnail( "https://github.com/Cool-oh/Cool-Oh-bot/blob/main/images/solana_logo.png?raw=true")
    .addFields({ "name": "Welcome to your first quest!!", "value": msg, "inline":false },)
    .setImage("https://github.com/Cool-oh/Cool-Oh-bot/blob/main/images/cool-oh-frodo-128x128.png?raw=true")
  
    return embed
}

async function getProfit(user:CryptoBot):Promise <number> {
    let profit=0
    if (user.hasInvested){
        let money = user.solanas! * await getSolanaPriceinEUR()
        profit = money - user.initialMoney!
    }else{
        profit = user.money! - user.initialMoney!
    }    

    return profit
}


export default {
    category:'investing',
    description: 'Gives you info about your investment',
    slash: 'both',
    testOnly:true,

    callback: async  ({interaction}) => {

        await interaction.deferReply({
            ephemeral:true
          })
    
        let message = ''
        let messgageInvested

        let discordUserName = interaction.user.username
        let userID = interaction.user.id 

        let user = await chekIfUserExists(userID,discordUserName)  
        let profit = await getProfit(user)
        let percentage =100*profit/user.initialMoney!   
        if(user.hasInvested){
            messgageInvested = 'You have invested'
        }else{
            messgageInvested = "You haven't invested yet"
        }                                                                  

        message = "Here's your info:\n"+  messgageInvested + '\nSolana price at this time: ' + await getSolanaPriceinEUR() + '€' +"\nMoney: " + user.money +'€\nSolanas: ' + user.solanas + '\nYou started with : ' + user.initialMoney + '€' +
            '\nYour profit is: \n' + Math.trunc(profit*100)/100  + '€\n' + Math.trunc(percentage*1000)/1000 + '%'
        let embed = embedRedraw(message) as MessageEmbed

        await interaction.editReply({
            content: 'Please select what you want me to do',
            embeds: [embed],

          })

    
    }
    
}as ICommand