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
const solprice_1 = require("./solprice");
const backendless_1 = __importDefault(require("backendless"));
const dotenv_1 = __importDefault(require("dotenv"));
const tools_1 = require("../tools/tools");
dotenv_1.default.config();
backendless_1.default.initApp(process.env.BACKENDLESS_APP_ID, process.env.BACKENDLESS_API_KEY);
function buySolana(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let solPrice;
        let solanas;
        let money;
        let message = '';
        if (!user.hasInvested) {
            money = user.money;
            solPrice = yield (0, solprice_1.getSolanaPriceinEUR)();
            solanas = money / solPrice;
            user.solanas = solanas;
            user.lastMoney = money;
            user.money = 0;
            user.lastSolPrice = solPrice;
            message = 'I have boughtt ' + user.solanas + ' solanas with ' + user.lastMoney + ' euros. solanaPrice was ' + user.lastSolPrice;
            user.hasInvested = true;
            yield backendless_1.default.Data.of('CryptoBot').save(user);
        }
        else {
            message = 'You have already invested';
        }
        return message;
    });
}
exports.default = {
    category: 'investing',
    description: 'Buys solana with available money.',
    slash: 'both',
    testOnly: true,
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        let message = '';
        let userID = interaction.user.id;
        let discordUserName = interaction.user.username;
        yield interaction.deferReply({
            ephemeral: true
        });
        let user = yield (0, tools_1.chekIfUserExists)(userID, discordUserName);
        message = yield buySolana(user);
        yield interaction.editReply(message);
    })
};
