import { ICommand } from "wokcommands";
import axios from 'axios'




interface SolaPriceInterface{
    data:{
        solana:{
            eur:number
        }
    }

}
export async function getSolanaPriceinEUR(){
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=eur'
    let apiCallResult:SolaPriceInterface
    let solanaPrice

    apiCallResult = await axios.get(url)
    //console.log(apiCallResult.data)
    

    solanaPrice = apiCallResult.data.solana.eur
    return solanaPrice

}




export default {
    category:'investing',
    description: 'Gives Solana price in EUR',
    slash: 'both',
    testOnly:true,
    


    callback: async ({interaction}) => {
        await interaction.deferReply({
            ephemeral:true
          })
        let resultado = await getSolanaPriceinEUR()    
        
        await interaction.editReply(resultado.toString() + ' Euros')

    }
    
}as ICommand