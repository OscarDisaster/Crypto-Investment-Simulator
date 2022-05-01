import { ICommand } from "wokcommands"
import solprice from "./solprice";
import { getSolanaPriceinEUR } from "./solprice"
import Backendless from 'backendless'
import dotenv from 'dotenv'
import { CryptoBot } from "../interfaces/interfaces"
import { chekIfUserExists } from "../tools/tools"
dotenv.config()


Backendless.initApp(process.env.BACKENDLESS_APP_ID!, process.env.BACKENDLESS_API_KEY!  )


async function buySolana (user:CryptoBot):Promise<string>{
    let solPrice : number
    let solanas : number
    let money:number
    let message =''

    if(!user.hasInvested){
        
      money = user.money!
      solPrice = await getSolanaPriceinEUR() 
    
      solanas = money/solPrice

      user.solanas = solanas
      user.lastMoney = money
      user.money = 0
      user.lastSolPrice = solPrice   

      message = 'I have boughtt ' + user.solanas + ' solanas with ' + user.lastMoney+  ' euros. solanaPrice was ' + user.lastSolPrice
      user.hasInvested = true
      await Backendless.Data.of('CryptoBot').save(user)

    } else {
        message = 'You have already invested'
     } 
     return message
}

export default {
    category:'investing',
    description: 'Buys solana with available money.',
    slash: 'both',
    testOnly:true,

    callback: async  ({interaction}) => {
      let message = ''
      let userID = interaction.user.id 
      let discordUserName = interaction.user.username

      await interaction.deferReply({
        ephemeral:true
      })
      let user = await chekIfUserExists(userID,discordUserName)      
      message = await  buySolana(user)

      await interaction.editReply(message)
    }
    
}as ICommand