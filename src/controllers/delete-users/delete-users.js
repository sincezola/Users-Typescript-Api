"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const utils_1 = require("../utils/utils");
class DeleteUserController {
    constructor(deleteUserRepository) {
        this.deleteUserRepository = deleteUserRepository;
    }
    async handle(httpRequest) {
        try {
            const id = httpRequest?.params?.id;
            if (!id) {
                return (0, utils_1.badRequest)("Missing user id");
            }
            await this.deleteUserRepository.deleteUser(id);
            return (0, utils_1.noContentToResponse)();
        }
        catch (err) {
            console.log(err);
            return (0, utils_1.internalServerError)();
        }
    }
}
exports.DeleteUserController = DeleteUserController;
