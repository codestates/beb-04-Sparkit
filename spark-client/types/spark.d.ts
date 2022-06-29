export interface Comments {
  post_id: number;
  user_id: number;
  commnet: string;
  id: number;
}

export interface Tags {
  tags: Hashtags[];
}

export interface Hashtags {
  id: number;
  hashtag: string;
}

export interface Writer {
  nickname: string;
}

export interface GetPosts {
  id: number;
  title: string;
  post_content: string;
  user_id: number;
  created_at: string;
  hashtags: Hashtags[];
  comments: Comments[];
  writer: Writer;
  likes: number;
}

export interface BackColor {
  backgroundColor: string;
}

export interface Results {
  getPosts: GetPosts[];
}

export interface ResultsHashTag {
  getPostsByHashtag: GetPosts[];
}
