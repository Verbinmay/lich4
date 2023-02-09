"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avtorizationValidationMiddleware = void 0;
const avtorizationValidationMiddleware = (req, res, next) => {
    if (req.headers["authorization"] !== "Basic YWRtaW46cXdlcnR5") {
        res.send(401);
    }
    else {
        next();
    }
};
exports.avtorizationValidationMiddleware = avtorizationValidationMiddleware;
