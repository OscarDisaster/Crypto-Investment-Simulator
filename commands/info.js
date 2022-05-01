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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const backendless_1 = __importDefault(require("backendless"));
const dotenv_1 = __importDefault(require("dotenv"));
const tools_1 = require("../tools/tools");
const solprice_1 = require("./solprice");
dotenv_1.default.config();
backendless_1.default.initApp(process.env.BACKENDLESS_APP_ID, process.env.BACKENDLESS_API_KEY);
function getProfit(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let profit = 0;
        if (user.hasInvested) {
            let money = user.solanas * (yield (0, solprice_1.getSolanaPriceinEUR)());
            profit = money - user.initialMoney;
        }
        else {
            profit = user.money - user.initialMoney;
        }
        return profit;
    });
}
exports.default = {
    category: 'investing',
    description: 'Gives you info about your investment',
    slash: 'both',
    testOnly: true,
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply({
            ephemeral: true
        });
        let message = '';
        let messgageInvested;
        let discordUserName = interaction.user.username;
        let userID = interaction.user.id;
        let user = yield (0, tools_1.chekIfUserExists)(userID, discordUserName);
        let profit = yield getProfit(user);
        let percentage = 100 * profit / user.initialMoney;
        if (user.hasInvested) {
            messgageInvested = 'You have invested';
        }
        else {
            messgageInvested = "You haven't invested yet";
        }
        message = "Here's your info:\n" + messgageInvested + '\nSolana price at this time: ' + (yield (0, solprice_1.getSolanaPriceinEUR)()) + '€' + "\nMoney: " + user.money + '€\nSolanas: ' + user.solanas + '\nYou started with : ' + user.initialMoney + '€' +
            '\nYour profit is: \n' + Math.trunc(profit * 100) / 100 + '€\n' + Math.trunc(percentage * 1000) / 1000 + '%';
        yield interaction.editReply(message);
    })
};
