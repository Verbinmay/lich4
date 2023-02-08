import exp from "constants"
import { string } from "yargs"

export type APIErrorResult = Array<FieldError>

export type FieldError = {
    message:string,
    field:string
}

export type Paginator = {
    pagesCount: number
    page:number
    pageSize:number
    totalCount:number
}

export type PaginatorBlog = Paginator & {
items: Array<BlogViewModel>
}

export type PaginatorPost = Paginator & {
    items: Array<PostViewModel>
    }

export type BlogInputModel = { 
    name:string
    description:string
    websiteUrl:string
}

export type BlogPostInputModel = {
    title:string
    shortDescription: string
    content: string
}

export type PostInputModel = {
    title:string
    shortDescription: string
    content: string
    blogId:string
}

export type BlogViewModel= {
    id:string
    name:string
    description:string
    websiteUrl:string
    createdAt:string
    isMembership: boolean
}
export type PostViewModel = {
    id: string
    title:string
    shortDescription: string
    content: string
    blogId:string
    blogName:string
    createdAt: string
}

