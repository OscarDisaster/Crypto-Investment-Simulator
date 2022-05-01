"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../tools/tools");
const solprice_1 = require("./solprice");
const envInitialMoney = parseInt(process.env.INITIAL_MONEY);
function sellSolana(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let solPrice;
        let solanas;
        let money;
        let message = '';
        if (user.hasInvested) {
            solPrice = yield (0, solprice_1.getSolanaPriceinEUR)();
            solanas = user.solanas;
            money = solanas * solPrice;
            user.lastSolanas = solanas;
            user.solanas = 0;
            user.money = money;
            user.lastSolPrice = solPrice;
            message = 'I have sold ' + user.lastSolanas + ' and got ' + money + ' euros. solanaPrice was ' + user.lastSolPrice;
            user.hasInvested = false;
            yield Backendless.Data.of('CryptoBot').save(user);
        }
        else {
            message = "You can't sell, you need to buy solana first.";
        }
        return message;
    });
}
exports.default = {
    category: 'investing',
    description: 'Sells all solana.',
    slash: 'both',
    testOnly: true,
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply({
            ephemeral: true
        });
        var message = '';
        let userID = interaction.user.id;
        let discordUserName = interaction.user.username;
        let user = yield (0, tools_1.chekIfUserExists)(userID, discordUserName);
        message = yield sellSolana(user);
        yield interaction.editReply(message);
    })
};
