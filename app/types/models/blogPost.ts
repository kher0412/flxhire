import { IVideo } from './freelancer'

export interface IBlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  author_name: string
  author_avatar_url: string
  author_slug: string
  author_video: IVideo
  author_freelancer_type: string
  is_own_post: boolean
  blog_category_id: number
  blog_subcategory_id: number
  blog_category_name: string
  blog_category_slug: string
  blog_subcategory_name: string
  post_date: string
  status: string
  video: IVideo
}
