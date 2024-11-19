"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpStatusCode = void 0;
var httpStatusCode;
(function (httpStatusCode) {
    httpStatusCode[httpStatusCode["OK"] = 200] = "OK";
    httpStatusCode[httpStatusCode["CREATED"] = 201] = "CREATED";
    httpStatusCode[httpStatusCode["BAD_RESQUEST"] = 400] = "BAD_RESQUEST";
    httpStatusCode[httpStatusCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    httpStatusCode[httpStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
})(httpStatusCode || (exports.httpStatusCode = httpStatusCode = {}));
