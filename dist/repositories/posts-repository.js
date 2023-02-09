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
exports.postsRepository = void 0;
const db_1 = require("./db");
exports.postsRepository = {
    findPosts(sortBy, pageNumber, pageSize, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            let ItSortBy = "createdAt";
            if (sortBy != (undefined || null)) {
                ItSortBy = sortBy;
            }
            let ItSortDirection = "desc";
            if (sortDirection != (undefined || null)) {
                ItSortDirection = sortDirection;
            }
            let ItPageNumber = 1;
            if (pageNumber != (undefined || null)) {
                ItPageNumber = Number(pageNumber);
            }
            let ItPageSize = 10;
            if (pageSize != (undefined || null)) {
                ItPageSize = Number(pageSize);
            }
            const IttotalCount = yield db_1.postsCollections.countDocuments({});
            const ItpagesCount = Math.ceil(IttotalCount / ItPageSize);
            const arrayOfFoundPosts = yield db_1.postsCollections
                .find({}, { projection: { _id: 0 } })
                .skip((ItPageNumber - 1) * ItPageSize)
                .limit(ItPageSize)
                .toArray();
            const n = [...arrayOfFoundPosts].sort((u1, u2) => {
                if (u1[ItSortBy] < u2[ItSortBy]) {
                    return ItSortDirection === "asc" ? -1 : 1;
                }
                return 0;
            });
            const newPaginatorBlog = {
                pagesCount: ItpagesCount,
                page: ItPageNumber,
                pageSize: ItPageSize,
                totalCount: IttotalCount,
                items: n,
            };
            return newPaginatorBlog;
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundpostById = yield db_1.postsCollections.findOne({ id: id }, { projection: { _id: 0 } });
            return foundpostById;
        });
    },
    createPost(createdPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollections.insertOne(createdPost);
            return exports.postsRepository.findPostById(createdPost.id);
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollections.updateOne({ id: id }, {
                $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId,
                },
            });
            return result.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollections.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
};
