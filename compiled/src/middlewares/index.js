"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = (request, response, next) => {
    request.user = { userId: 1, name: 'galbi' };
    next();
};
