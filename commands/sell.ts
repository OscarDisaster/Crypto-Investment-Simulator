import { ICommand } from "wokcommands";
import { CryptoBot } from "../interfaces/interfaces"
import { chekIfUserExists } from "../tools/tools";

import { getSolanaPriceinEUR } from "./solprice";
const envInitialMoney = parseInt(process.env.INITIAL_MONEY!) 


async function sellSolana (user:CryptoBot):Promise<string>{
  let solPrice : number
  let solanas : number
  let money:number
  let message =''

    

    if(user.hasInvested){
      

      solPrice = await getSolanaPriceinEUR()       
      solanas = user.solanas!
      money = solanas * solPrice
    
      user.lastSolanas = solanas
      user.solanas = 0
      user.money = money
      user.lastSolPrice = solPrice
        

      message = 'I have sold ' + user.lastSolanas + ' and got ' + money+  ' euros. solanaPrice was ' + user.lastSolPrice
      user.hasInvested = false
      await Backendless.Data.of('CryptoBot').save(user)

    }else {
      message = "You can't sell, you need to buy solana first."
   } 
    
    return message



}





export default {
    category:'investing',
    description: 'Sells all solana.',
    slash: 'both',
    testOnly:true,

    callback: async  ({interaction}) => {
      await interaction.deferReply({
        ephemeral:true
      })

      var message = ''
      let userID = interaction.user.id 
      let discordUserName = interaction.user.username
      let user = await chekIfUserExists(userID,discordUserName)

      message = await  sellSolana(user)

      await interaction.editReply(message)
    }
    
}as ICommand