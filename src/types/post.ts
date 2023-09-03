type Image = {
  id: string;
  url: string;
  type: string;
  name: string;
  post_id?: string;
  Post?: {
    title: string;
  };
};

type Post = {
  id: string;
  title: string;
  description: string | null;
  is_release: boolean;
  content: string;
  release_date: Date | null;
  category: string | null;
  created_at: Date;
  update_at: Date;
  cover: string;
  tags?: Tag[];
};

type Category = {
  id: string;
  name: string;
};

type Tag = {
  id: string;
  name: string;
};
