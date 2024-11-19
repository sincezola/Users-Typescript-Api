"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const validator_1 = __importDefault(require("validator"));
const utils_1 = require("../utils/utils");
class CreateUserController {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository;
    }
    async handle(httpRequest) {
        try {
            if (!httpRequest?.body) {
                return (0, utils_1.badRequest)("Request body is required");
            }
            const requiredFields = [
                "firstName",
                "lastName",
                "email",
                "password",
            ];
            for (const field of requiredFields) {
                if (!httpRequest?.body?.[field]?.length) {
                    return (0, utils_1.badRequest)(`Field ${field} is required`);
                }
            }
            const emailIsValid = validator_1.default.isEmail(httpRequest.body.email);
            if (!emailIsValid) {
                return (0, utils_1.badRequest)("E-mail is invalid");
            }
            const user = await this.createUserRepository.createUser(httpRequest.body);
            return (0, utils_1.created)(user);
        }
        catch (err) {
            console.log(err);
            return (0, utils_1.internalServerError)();
        }
    }
}
exports.CreateUserController = CreateUserController;
