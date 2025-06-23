export type CommentAuthor = {
  userId: number;
  nickname: string;
  imgUrl: string;
};

export type Comment = {
  id: number;
  comment: string;
  author: CommentAuthor;
  createdAt: string;
};
