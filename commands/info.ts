import { ICommand } from "wokcommands"
import Backendless from 'backendless'
import dotenv from 'dotenv'
import { chekIfUserExists } from "../tools/tools"
import { CryptoBot } from "../interfaces/interfaces";
import { getSolanaPriceinEUR } from "./solprice";
dotenv.config()

Backendless.initApp(process.env.BACKENDLESS_APP_ID!, process.env.BACKENDLESS_API_KEY!  )


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

        await interaction.editReply(message)

    
    }
    
}as ICommand