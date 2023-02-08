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
    const foundBlogsInBd = yield blogs_repository_1.blogsRepository.findBlogs((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString(), (_b = req.query.sortBy) === null || _b === void 0 ? void 0 : _b.toString(), (_c = req.query.pageNumber) === null || _c === void 0 ? void 0 : _c.toString(), (_d = req.query.pageSize) === null || _d === void 0 ? void 0 : _d.toString(), (_e = req.query.sortDirection) === null || _e === void 0 ? void 0 : _e.toString());
    const foundBlogs = {
        pagesCount: foundBlogsInBd.pagesCount,
        page: foundBlogsInBd.page,
        pageSize: foundBlogsInBd.pageSize,
        totalCount: foundBlogsInBd.totalCount,
        items: foundBlogsInBd.items.map((m) => {
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
    const foundBlogInBd = yield blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (foundBlogInBd) {
        const foundBlog = {
            id: foundBlogInBd.id,
            name: foundBlogInBd.name,
            description: foundBlogInBd.description,
            websiteUrl: foundBlogInBd.websiteUrl,
            createdAt: foundBlogInBd.createdAt,
            isMembership: foundBlogInBd.isMembership,
        };
        res.send(foundBlog);
    }
    else {
        res.send(404);
    }
}));
exports.blogsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlogInBd = yield blogs_server_1.blogsService.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    const newBlog = {
        id: newBlogInBd.id,
        name: newBlogInBd.name,
        description: newBlogInBd.description,
        websiteUrl: newBlogInBd.websiteUrl,
        createdAt: newBlogInBd.createdAt,
        isMembership: newBlogInBd.isMembership,
    };
    res.status(201).send(newBlog);
}));
exports.blogsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBlogInBd = yield blogs_server_1.blogsService.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (updateBlogInBd) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.blogsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DeleteBlogInBd = yield blogs_server_1.blogsService.deleteBlog(req.params.id);
    if (DeleteBlogInBd) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.blogsRouter.get("/:id/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j;
    const foundPostsByBlogerIdInBd = yield blogs_repository_1.blogsRepository.findPostsByBlogerId(req.path, (_f = req.query.sortBy) === null || _f === void 0 ? void 0 : _f.toString(), (_g = req.query.pageNumber) === null || _g === void 0 ? void 0 : _g.toString(), (_h = req.query.pageSize) === null || _h === void 0 ? void 0 : _h.toString(), (_j = req.query.sortDirection) === null || _j === void 0 ? void 0 : _j.toString());
    if (foundPostsByBlogerIdInBd) {
        const foundBlogs = {
            pagesCount: foundPostsByBlogerIdInBd.pagesCount,
            page: foundPostsByBlogerIdInBd.page,
            pageSize: foundPostsByBlogerIdInBd.pageSize,
            totalCount: foundPostsByBlogerIdInBd.totalCount,
            items: foundPostsByBlogerIdInBd.items.map((m) => {
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
    }
    else {
        res.send(404);
    }
}));
