import { blogsRepository } from "../repositories/blogs-repository";
import { postsCollections } from "../repositories/db";
import { postsRepository } from "../repositories/posts-repository";

export const postsService = {
  async createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ) {
    let isId: string = "";
    let schetchik = false;
    let i = 0;
    do {
      i++;
      let findIdPost = await postsCollections.findOne({ id: String(i) });
      if (!findIdPost) {
        isId = String(i);
        schetchik = true;
      }
    } while (schetchik === false);
    let isPostName = "";
    let a = await blogsRepository.findBlogById(blogId);
    if (a) {
      isPostName = a.name;
    }

    let isCreateAt: string = "";
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
    const result = await postsRepository.createPost(createdPost);
    return result;
  },
  async updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    return await postsRepository.updatePost(
      id,
      title,
      shortDescription,
      content,
      blogId
    );
  },
  async deletePost(id: string): Promise<boolean> {
    return await postsRepository.deletePost(id);
  },
};
