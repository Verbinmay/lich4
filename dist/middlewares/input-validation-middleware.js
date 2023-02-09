"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = exports.isBlogIdValidationInPath = exports.isBlogIdValidation = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = exports.websiteUrlValidation = exports.descriptionValidation = exports.nameValidation = void 0;
const express_validator_1 = require("express-validator");
const blogs_repository_1 = require("../repositories/blogs-repository");
const db_1 = require("../repositories/db");
exports.nameValidation = (0, express_validator_1.body)("name")
    .isString()
    .withMessage("Not name")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name is empty")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Names length must be max 15");
exports.descriptionValidation = (0, express_validator_1.body)("description")
    .isString()
    .withMessage("Isnt string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Description is empty")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Description length must be max 500");
exports.websiteUrlValidation = (0, express_validator_1.body)("websiteUrl")
    .isURL()
    .withMessage("Isnt URL")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("WebsiteURL is empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("WebsiteUrl ength must be max 100");
exports.titleValidation = (0, express_validator_1.body)("title")
    .isString()
    .withMessage("Title isnt string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Title is empty")
    .bail()
    .isLength({ max: 30 })
    .withMessage("Title length must be max 30");
exports.shortDescriptionValidation = (0, express_validator_1.body)("shortDescription")
    .isString()
    .withMessage("ShortDescription isnt string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("ShortDescription is empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("shortDescription length must be max 100");
exports.contentValidation = (0, express_validator_1.body)("content")
    .isString()
    .withMessage("content isnt string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("content is empty")
    .bail()
    .isLength({ max: 1000 })
    .withMessage("content length must be max 1000");
exports.isBlogIdValidation = (0, express_validator_1.body)("blogId").custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield db_1.blogsCollections.findOne({ id: value });
    if (result) {
    }
    if (result == null) {
        throw new Error("Please insert existed user id");
    }
    return true;
}));
function isBlogIdValidationInPath(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield blogs_repository_1.blogsRepository.findBlogById(req.params.id);
        if (result === null) {
            return res.send(404);
        }
        else {
            return next();
        }
    });
}
exports.isBlogIdValidationInPath = isBlogIdValidationInPath;
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let newErorsArray = errors.array().map(function (a) {
            return {
                message: a.msg,
                field: a.param,
            };
        });
        res.status(400).json({ errorsMessages: newErorsArray });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
