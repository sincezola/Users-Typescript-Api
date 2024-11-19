"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersController = void 0;
const utils_1 = require("../utils/utils");
class GetUsersController {
    constructor(getUsersRepository) {
        this.getUsersRepository = getUsersRepository;
    }
    async handle() {
        try {
            const users = await this.getUsersRepository.getUsers();
            return (0, utils_1.ok)(users);
        }
        catch (err) {
            console.log(err);
            return (0, utils_1.internalServerError)();
        }
    }
}
exports.GetUsersController = GetUsersController;
