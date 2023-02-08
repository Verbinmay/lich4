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
exports.postsService = void 0;
const blogs_repository_1 = require("../repositories/blogs-repository");
const db_1 = require("../repositories/db");
const posts_repository_1 = require("../repositories/posts-repository");
exports.postsService = {
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            let isId = "";
            let schetchik = false;
            let i = 0;
            do {
                i++;
                let findIdPost = yield db_1.postsCollections.findOne({ id: String(i) });
                if (!findIdPost) {
                    isId = String(i);
                    schetchik = true;
                }
            } while (schetchik === false);
            let isPostName = "";
            let a = yield blogs_repository_1.blogsRepository.findBlogById(blogId);
            if (a) {
                isPostName = a.name;
            }
            let isCreateAt = "";
            const today = new Date();
            isCreateAt = today.toISOString();
            const createdPost = {
                id: isId,
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: isPostName,
                createdAt: isCreateAt,
            };
            const result = yield posts_repository_1.postsRepository.createPost(createdPost);
            return result;
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.updatePost(id, title, shortDescription, content, blogId);
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_repository_1.postsRepository.deletePost(id);
        });
    },
};
