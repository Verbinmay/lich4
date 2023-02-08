import { BlogViewModel, PostViewModel } from "../types";
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
      const n = [...arrayOfFoundBlogs].sort((u1, u2)=>{ 
        if(u1[ItSortBy as keyof typeof u1]<u2[ItSortBy as keyof typeof u2]){
         return ItSortDirection ==="asc"? -1: 1
        }
       
       return 0;
     })

    const newPaginatorBlog = {
      pagesCount: ItpagesCount,
      page: ItPageNumber,
      pageSize: ItPageSize,
      totalCount: IttotalCount,
      items: n,
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
  async createBlog(createdBlog: BlogViewModel) {
    const result = await blogsCollections.insertOne(createdBlog);
    return blogsRepository.findBlogById(createdBlog.id);
  },
  async updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    const result = await blogsCollections.updateOne(
      { id: id },
      { $set: { name: name, description: description, websiteUrl: websiteUrl } }
    );
    return result.matchedCount === 1;
  },

  async deleteBlog(id: string): Promise<boolean> {
    const result = await blogsCollections.deleteOne({ id: id });
    return result.deletedCount === 1;
  },

  async findPostsByBlogerId(id: string, sortBy: string | undefined | null,
    pageNumber: string | undefined | null,
    pageSize: string | undefined | null,
    sortDirection: string | undefined | null) {

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
  
      const IttotalCount = await blogsCollections.countDocuments( { blogId: id });
  
      const ItpagesCount = Math.ceil(IttotalCount / ItPageSize);
      const arrayOfFoundBlogs = await blogsCollections
        .find( { blogId: id }, { projection: { _id: 0 } })
        .skip(ItPageNumber * ItPageSize)
        .limit(ItPageSize)
        .toArray();
        const n = [...arrayOfFoundBlogs].sort((u1, u2)=>{ 
          if(u1[ItSortBy as keyof typeof u1]<u2[ItSortBy as keyof typeof u2]){
           return ItSortDirection ==="asc"? -1: 1
          }
         
         return 0;
       })
  
      const newPaginatorBlog = {
        pagesCount: ItpagesCount,
        page: ItPageNumber,
        pageSize: ItPageSize,
        totalCount: IttotalCount,
        items: n,
      };
      return newPaginatorBlog;
    



  
    return newPaginatorBlog;
  }
};
