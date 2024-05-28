export type Product = {
  id: number;
  title: string;
  description: string;
  price: string;
  tags: string[];
  thumbnail: string;
};

export type CategorySlug = {
  slug: string;
  name: string;
  url: string;
};
