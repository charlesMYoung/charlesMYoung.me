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
  description: string;
  is_release: boolean;
  content: string;
  release_date: Date;
  category: string;
  created_at: Date;
  update_at: Date;
  cover: string;
  tags?: string[];
  dataSource?: string;
};

type Category = {
  id: string;
  name: string;
};

type Tag = {
  id: string;
  name: string;
};

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
