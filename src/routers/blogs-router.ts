import { Request, Response, Router } from "express";
import { blogsService } from "../domain/blogs-server";
import { blogsRepository } from "../repositories/blogs-repository";
import { BlogViewModel, PaginatorBlog } from "../types";

export const blogsRouter = Router({});

blogsRouter.get("/", async (req: Request, res: Response) => {
  const foundBlogsInBd = await blogsRepository.findBlogs(
    req.query.title?.toString(),
    req.query.sortBy?.toString(),
    req.query.pageNumber?.toString(),
    req.query.pageSize?.toString(),
    req.query.sortDirection?.toString()
  );
  const foundBlogs: PaginatorBlog = {
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
});

blogsRouter.get("/:id", async (req: Request, res: Response) => {
  const foundBlogInBd = await blogsRepository.findBlogById(req.params.id);
  if (foundBlogInBd) {
    const foundBlog: BlogViewModel = {
      id: foundBlogInBd.id,
      name: foundBlogInBd.name,
      description: foundBlogInBd.description,
      websiteUrl: foundBlogInBd.websiteUrl,
      createdAt: foundBlogInBd.createdAt,
      isMembership: foundBlogInBd.isMembership,
    };
    res.send(foundBlog);
  } else {
    res.send(404);
  }
});

blogsRouter.post("/", async (req: Request, res: Response) => {
  const newBlogInBd = await blogsService.createBlog(
    req.body.name,
    req.body.description,
    req.body.websiteUrl
  );
  const newBlog: BlogViewModel = {
    id: newBlogInBd!.id,
    name: newBlogInBd!.name,
    description: newBlogInBd!.description,
    websiteUrl: newBlogInBd!.websiteUrl,
    createdAt: newBlogInBd!.createdAt,
    isMembership: newBlogInBd!.isMembership,
  };
  res.status(201).send(newBlog);
});

blogsRouter.put("/:id", async (req: Request, res: Response) => {
  const updateBlogInBd = await blogsService.updateBlog(
    req.params.id,
    req.body.name,
    req.body.description,
    req.body.websiteUrl
  );
  if (updateBlogInBd) {
    res.send(204);
  } else {
    res.send(404);
  }
});

blogsRouter.delete("/:id", async (req: Request, res: Response) => {
  const DeleteBlogInBd = await blogsService.deleteBlog(req.params.id);
  if (DeleteBlogInBd) {
    res.send(204);
  } else {
    res.send(404);
  }
});

blogsRouter.get("/:id/posts", async (req: Request, res: Response) => {
  const foundPostsByBlogerIdInBd = await blogsRepository.findPostsByBlogerId(
    req.path,
    req.query.sortBy?.toString(),
    req.query.pageNumber?.toString(),
    req.query.pageSize?.toString(),
    req.query.sortDirection?.toString()
  );
  if (foundPostsByBlogerIdInBd) {
    const foundBlogs: PaginatorBlog = {
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
  } else {
    res.send(404);
  }
});
