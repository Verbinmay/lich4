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
exports.blogsService = void 0;
const blogs_repository_1 = require("../repositories/blogs-repository");
const db_1 = require("../repositories/db");
exports.blogsService = {
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let isId = "";
            let schetchik = false;
            let i = 0;
            do {
                i++;
                let findIdPost = yield db_1.blogsCollections.findOne({ id: String(i) });
                if (!findIdPost) {
                    isId = String(i);
                    schetchik = true;
                }
            } while (schetchik === false);
            let isCreateAt = "";
            const today = new Date();
            isCreateAt = today.toISOString();
            let isIsMembership = false;
            const createdBlog = {
                id: isId,
                name: name,
                description: description,
                websiteUrl: websiteUrl,
                createdAt: isCreateAt,
                isMembership: isIsMembership,
            };
            const result = yield blogs_repository_1.blogsRepository.createBlog(createdBlog);
            return result;
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_repository_1.blogsRepository.updateBlog(id, name, description, websiteUrl);
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_repository_1.blogsRepository.deleteBlog(id);
        });
    },
};
