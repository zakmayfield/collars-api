"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken = (id, type, role) => jsonwebtoken_1.default.sign({ id: id, type: type, role: role }, config_1.default.APP_SECRET, {
    expiresIn: '2d',
});
exports.Mutation = {
    test: () => 'test',
    registerAgency: async (_parent, args, context) => {
        const { name, email, password } = args.input;
        const checkIfNameExists = await context.db.agency.findUnique({
            where: { name },
        });
        const checkIfEmailExists = await context.db.agency.findUnique({
            where: { email },
        });
        if (checkIfEmailExists) {
            throw new Error(`🚫 Email alraedy taken`);
        }
        if (checkIfNameExists) {
            throw new Error(`🚫 Name alraedy taken`);
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const createdAgency = await context.db.agency.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const validAgency = {
            ...createdAgency,
            token: generateToken(createdAgency.id, 'agency', null),
        };
        return validAgency;
    },
    loginAgency: async (_parent, args, context) => {
        const { email, password } = args.input;
        const agency = await context.db.agency.findUnique({
            where: { email },
        });
        if (!agency) {
            throw new Error(`🚫 Email does not exist`);
        }
        const valid = await bcrypt_1.default.compare(password, agency.password);
        if (!valid)
            throw new Error(`🚫 Invalid password`);
        const validAgency = {
            ...agency,
            token: generateToken(agency.id, 'agency', null)
        };
        return validAgency;
    }
};
