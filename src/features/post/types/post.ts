import { Author } from './author';
import { Category } from './Category';

export type Post = {
  postId: number;
  problemNumber: number;
  title: string;
  createdAt: string;
  categories: Category[];
  author: Author;
  commentCount: number;
  likeCount: number;
};
