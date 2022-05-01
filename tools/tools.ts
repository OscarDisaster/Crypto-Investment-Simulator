import { CryptoBot } from "../interfaces/interfaces"
import dotenv from 'dotenv'
dotenv.config()
const envInitialMoney = parseInt(process.env.INITIAL_MONEY!) 



export async function chekIfUserExists(userID:string,discordUserName:string){

    let whereClause = "userID='" + userID + "'"
    let queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause)
    let result:CryptoBot[]
    result = await Backendless.Data.of('CryptoBot').find(queryBuilder)
   
    if ( result[0] === undefined){
  
      let newUser:CryptoBot = {
        userID: userID,
        discordUserName:discordUserName,
        money : envInitialMoney,
        initialMoney: envInitialMoney
      }
      let newUserSaved = await Backendless.Data.of('CryptoBot').save(newUser)
      return newUserSaved
  
    } else {
  
      return result[0]
    }
  
  }
   