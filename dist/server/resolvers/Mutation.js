"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const generateToken = (id) => jsonwebtoken_1.default.sign({ memberId: id }, config_1.default.APP_SECRET, { expiresIn: '2d' });
exports.Mutation = {
    test: () => 'test',
    registerAgency: async (_parent, args, context) => {
        const { name, email, password } = args.input;
        const checkIfNameExists = await context.db.agency.findUnique({
            where: { name }
        });
        const checkIfEmailExists = await context.db.agency.findUnique({
            where: { email }
        });
        if (checkIfEmailExists || checkIfEmailExists) {
            throw new Error();
        }
    }
};
