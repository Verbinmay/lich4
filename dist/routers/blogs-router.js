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
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_server_1 = require("../domain/blogs-server");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const foundBlogsInBD = yield blogs_repository_1.blogsRepository.findBlogs((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString(), (_b = req.query.sortBy) === null || _b === void 0 ? void 0 : _b.toString(), (_c = req.query.pageNumber) === null || _c === void 0 ? void 0 : _c.toString(), (_d = req.query.pageSize) === null || _d === void 0 ? void 0 : _d.toString(), (_e = req.query.sortDirection) === null || _e === void 0 ? void 0 : _e.toString());
    const foundBlogs = {
        pagesCount: foundBlogsInBD.pagesCount,
        page: foundBlogsInBD.page,
        pageSize: foundBlogsInBD.pageSize,
        totalCount: foundBlogsInBD.totalCount,
        items: foundBlogsInBD.items.map((m) => {
            return {
                id: m.id,
                name: m.name,
                description: m.description,
                websiteUrl: m.websiteUrl,
                createdAt: m.createdAt,
                isMembership: m.isMembership,
            };
        }),
    };
    res.send(foundBlogs);
}));
exports.blogsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlogInBD = yield blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (foundBlogInBD) {
        const foundBlog = {
            id: foundBlogInBD.id,
            name: foundBlogInBD.name,
            description: foundBlogInBD.description,
            websiteUrl: foundBlogInBD.websiteUrl,
            createdAt: foundBlogInBD.createdAt,
            isMembership: foundBlogInBD.isMembership,
        };
        res.send(foundBlog);
    }
    else {
        res.send(404);
    }
}));
exports.blogsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBloginBd = yield blogs_server_1.blogsService.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    const newBlog = {
        id: newBloginBd.id,
        name: newBloginBd.name,
        description: newBloginBd.description,
        websiteUrl: newBloginBd.websiteUrl,
        createdAt: newBloginBd.createdAt,
        isMembership: newBloginBd.isMembership,
    };
    res.status(201).send(newBlog);
}));
