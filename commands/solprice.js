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
exports.getSolanaPriceinEUR = void 0;
const axios_1 = __importDefault(require("axios"));
function getSolanaPriceinEUR() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=eur';
        let apiCallResult;
        let solanaPrice;
        apiCallResult = yield axios_1.default.get(url);
        //console.log(apiCallResult.data)
        solanaPrice = apiCallResult.data.solana.eur;
        return solanaPrice;
    });
}
exports.getSolanaPriceinEUR = getSolanaPriceinEUR;
exports.default = {
    category: 'investing',
    description: 'Gives Solana price in EUR',
    slash: 'both',
    testOnly: true,
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply({
            ephemeral: true
        });
        let resultado = yield getSolanaPriceinEUR();
        yield interaction.editReply(resultado.toString() + ' Euros');
    })
};
