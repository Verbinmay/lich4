import { BlogViewModel, PaginatorBlog } from "../types";
import { blogsCollections } from "./db";

export const blogsRepository = {
  async findBlogs(
    title: string | undefined | null,
    sortBy: string | undefined | null,
    pageNumber: string | undefined | null,
    pageSize: string | undefined | null,
    sortDirection: string | undefined | null
  ) {
    const filter: any = {};
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

    const IttotalCount = await blogsCollections.countDocuments(filter);

    const ItpagesCount = Math.ceil(IttotalCount / ItPageSize);
    const arrayOfFoundBlogs = await blogsCollections
      .find(filter, { projection: { _id: 0 } })
      .skip(ItPageNumber * ItPageSize)
      .limit(ItPageSize)
      .toArray();

    const newPaginatorBlog= {
      pagesCount: ItpagesCount,
      page: ItPageNumber,
      pageSize: ItPageSize,
      totalCount: IttotalCount,
      items: arrayOfFoundBlogs,
    };
    return newPaginatorBlog;
  },
  async findBlogById(id: string) {
    const foundBlogById: BlogViewModel | null = await blogsCollections.findOne(
      { id: id },
      { projection: { _id: 0 } }
    );
    return foundBlogById;
  },
  async createBlog(createdBlog:BlogViewModel){
    const result = await blogsCollections.insertOne(createdBlog);
    return blogsRepository.findBlogById(createdBlog.id)
  }
};
