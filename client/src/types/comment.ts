export type Comment = {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
  };
  likes:number;
};
