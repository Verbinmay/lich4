import { Request, Response, Router } from "express";
import { string } from "yargs";
import { blogsService } from "../domain/blogs-server";
import { blogsRepository } from "../repositories/blogs-repository";
import { BlogInputModel, BlogViewModel, PaginatorBlog } from "../types";

export const blogsRouter = Router({});

blogsRouter.get("/", async (req: Request, res: Response) => {
  const foundBlogsInBD = await blogsRepository.findBlogs(
    req.query.title?.toString(),
    req.query.sortBy?.toString(),
    req.query.pageNumber?.toString(),
    req.query.pageSize?.toString(),
    req.query.sortDirection?.toString()
  );
  const foundBlogs: PaginatorBlog = {
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
});

blogsRouter.get("/:id", async (req: Request, res: Response) => {
  const foundBlogInBD = await blogsRepository.findBlogById(req.params.id);
  if (foundBlogInBD) {
    const foundBlog: BlogViewModel = {
      id: foundBlogInBD.id,
      name: foundBlogInBD.name,
      description: foundBlogInBD.description,
      websiteUrl: foundBlogInBD.websiteUrl,
      createdAt: foundBlogInBD.createdAt,
      isMembership: foundBlogInBD.isMembership,
    };
    res.send(foundBlog);
  } else {
    res.send(404);
  }
});

blogsRouter.post("/", async (req: Request, res: Response) => {
  const newBloginBd = await blogsService.createBlog(
    req.body.name,
    req.body.description,
    req.body.websiteUrl
  );
  const newBlog: BlogViewModel = {
    id: newBloginBd!.id,
    name: newBloginBd!.name,
    description: newBloginBd!.description,
    websiteUrl: newBloginBd!.websiteUrl,
    createdAt: newBloginBd!.createdAt,
    isMembership: newBloginBd!.isMembership,
  };
  res.status(201).send(newBlog);
});
