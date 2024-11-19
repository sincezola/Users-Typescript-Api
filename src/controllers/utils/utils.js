"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noContentToResponse = exports.internalServerError = exports.created = exports.ok = exports.badRequest = void 0;
const protocols_1 = require("../protocols");
const badRequest = (message) => {
    return {
        statusCode: protocols_1.httpStatusCode.BAD_RESQUEST,
        body: message,
    };
};
exports.badRequest = badRequest;
const ok = (body) => {
    return {
        statusCode: protocols_1.httpStatusCode.OK,
        body: body,
    };
};
exports.ok = ok;
const created = (body) => {
    return {
        statusCode: protocols_1.httpStatusCode.CREATED,
        body: body,
    };
};
exports.created = created;
const internalServerError = () => {
    return {
        statusCode: protocols_1.httpStatusCode.SERVER_ERROR,
        body: "Something went wrong.",
    };
};
exports.internalServerError = internalServerError;
const noContentToResponse = () => ({
    statusCode: protocols_1.httpStatusCode.NO_CONTENT,
    body: null,
});
exports.noContentToResponse = noContentToResponse;
