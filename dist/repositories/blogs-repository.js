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
exports.blogsRepository = void 0;
const db_1 = require("./db");
exports.blogsRepository = {
    findBlogs(title, sortBy, pageNumber, pageSize, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (title) {
                filter.title = { $regex: "(?i)" + title + "(?-i)" };
            }
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
            const IttotalCount = yield db_1.blogsCollections.countDocuments(filter);
            const ItpagesCount = Math.ceil(IttotalCount / ItPageSize);
            const arrayOfFoundBlogs = yield db_1.blogsCollections
                .find(filter, { projection: { _id: 0 } })
                .skip(ItPageNumber * ItPageSize)
                .limit(ItPageSize)
                .toArray();
            const newPaginatorBlog = {
                pagesCount: ItpagesCount,
                page: ItPageNumber,
                pageSize: ItPageSize,
                totalCount: IttotalCount,
                items: arrayOfFoundBlogs,
            };
            return newPaginatorBlog;
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBlogById = yield db_1.blogsCollections.findOne({ id: id }, { projection: { _id: 0 } });
            return foundBlogById;
        });
    },
    createBlog(createdBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollections.insertOne(createdBlog);
            return exports.blogsRepository.findBlogById(createdBlog.id);
        });
    }
};
