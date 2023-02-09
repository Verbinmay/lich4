import { blogsRepository } from "../repositories/blogs-repository";
import { blogsCollections } from "../repositories/db";

export const blogsService = {
  async createBlog(name: string, description: string, websiteUrl: string) {
    let isId: string = "";
    let schetchik = false;
    let i = 0;
    do {
      i++;
      let findIdPost = await blogsCollections.findOne({ id: String(i) });
      if (!findIdPost) {
        isId = String(i);
        schetchik = true;
      }
    } while (schetchik === false);

    let isCreateAt: string = "";
    const today = new Date();
    isCreateAt = today.toISOString();

    let isIsMembership: boolean = false;
    const createdBlog = {
      id: isId,
      name: name,
      description: description,
      websiteUrl: websiteUrl,
      createdAt: isCreateAt,
      isMembership: isIsMembership,
    };
    const result = await blogsRepository.createBlog(createdBlog);
    return result;
  },
  async updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    return await blogsRepository.updateBlog(id, name, description, websiteUrl);
  },

  async deleteBlog(id: string): Promise<boolean> {
    return await blogsRepository.deleteBlog(id);
  },
 
};
