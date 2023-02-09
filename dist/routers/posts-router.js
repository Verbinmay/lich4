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
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_server_1 = require("../domain/posts-server");
const avtorization_middleware_1 = require("../middlewares/avtorization-middleware");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const posts_repository_1 = require("../repositories/posts-repository");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const foundPostsInBd = yield posts_repository_1.postsRepository.findPosts((_a = req.query.sortBy) === null || _a === void 0 ? void 0 : _a.toString(), (_b = req.query.pageNumber) === null || _b === void 0 ? void 0 : _b.toString(), (_c = req.query.pageSize) === null || _c === void 0 ? void 0 : _c.toString(), (_d = req.query.sortDirection) === null || _d === void 0 ? void 0 : _d.toString());
    const foundPosts = {
        pagesCount: foundPostsInBd.pagesCount,
        page: foundPostsInBd.page,
        pageSize: foundPostsInBd.pageSize,
        totalCount: foundPostsInBd.totalCount,
        items: foundPostsInBd.items.map((m) => {
            return {
                id: m.id,
                title: m.title,
                shortDescription: m.shortDescription,
                content: m.content,
                blogId: m.blogId,
                blogName: m.blogName,
                createdAt: m.createdAt,
            };
        }),
    };
    res.send(foundPosts);
}));
exports.postsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPostInBd = yield posts_repository_1.postsRepository.findPostById(req.params.id);
    if (foundPostInBd) {
        const foundPost = {
            id: foundPostInBd.id,
            title: foundPostInBd.title,
            shortDescription: foundPostInBd.shortDescription,
            content: foundPostInBd.content,
            blogId: foundPostInBd.blogId,
            blogName: foundPostInBd.blogName,
            createdAt: foundPostInBd.createdAt,
        };
        res.send(foundPost);
    }
    else {
        res.send(404);
    }
}));
exports.postsRouter.post("/", avtorization_middleware_1.avtorizationValidationMiddleware, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.titleValidation, input_validation_middleware_1.contentValidation, input_validation_middleware_1.isBlogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPostInBd = yield posts_server_1.postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    const newPost = {
        id: newPostInBd.id,
        title: newPostInBd.title,
        shortDescription: newPostInBd.shortDescription,
        content: newPostInBd.content,
        blogId: newPostInBd.blogId,
        blogName: newPostInBd.blogName,
        createdAt: newPostInBd.createdAt,
    };
    res.status(201).send(newPost);
}));
exports.postsRouter.put("/:id", avtorization_middleware_1.avtorizationValidationMiddleware, input_validation_middleware_1.shortDescriptionValidation, input_validation_middleware_1.titleValidation, input_validation_middleware_1.contentValidation, input_validation_middleware_1.isBlogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatePostInBd = yield posts_server_1.postsService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (updatePostInBd) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.postsRouter.delete("/:id", avtorization_middleware_1.avtorizationValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DeletePostInBd = yield posts_server_1.postsService.deletePost(req.params.id);
    if (DeletePostInBd) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
