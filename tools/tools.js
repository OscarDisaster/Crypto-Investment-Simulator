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
exports.chekIfUserExists = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envInitialMoney = parseInt(process.env.INITIAL_MONEY);
function chekIfUserExists(userID, discordUserName) {
    return __awaiter(this, void 0, void 0, function* () {
        let whereClause = "userID='" + userID + "'";
        let queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause);
        let result;
        result = yield Backendless.Data.of('CryptoBot').find(queryBuilder);
        if (result[0] === undefined) {
            let newUser = {
                userID: userID,
                discordUserName: discordUserName,
                money: envInitialMoney,
                initialMoney: envInitialMoney
            };
            let newUserSaved = yield Backendless.Data.of('CryptoBot').save(newUser);
            return newUserSaved;
        }
        else {
            return result[0];
        }
    });
}
exports.chekIfUserExists = chekIfUserExists;
