"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const utils_1 = require("../utils/utils");
class UpdateUserController {
    constructor(updateUserRepository) {
        this.updateUserRepository = updateUserRepository;
    }
    async handle(httpRequest) {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body;
            if (!body) {
                (0, utils_1.badRequest)("Missing fields.");
            }
            if (!id) {
                return (0, utils_1.badRequest)("Missing user id");
            }
            const allowedFieldsToUpdate = [
                "firstName",
                "lastName",
                "password",
            ];
            const someFieldIsNotAllowedToUpdate = Object.keys(body).some((key) => !allowedFieldsToUpdate.includes(key));
            if (someFieldIsNotAllowedToUpdate) {
                return (0, utils_1.badRequest)("Some received field is not allowed");
            }
            const user = await this.updateUserRepository.updateUser(id, body);
            return (0, utils_1.ok)(user);
        }
        catch (err) {
            console.log(err);
            return (0, utils_1.internalServerError)();
        }
    }
}
exports.UpdateUserController = UpdateUserController;
