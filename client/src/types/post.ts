export interface Post {
  id: number;
  title: string;
  //summary?: string;
  content?: string;
  author: string;
  tags: string;
  category:"a"|"b";
  image_urls:string[];
  user_id:number;
}
