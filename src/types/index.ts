type ProductsType =
  | 'bakery'
  | 'fruit'
  | 'dairy'
  | 'meat'
  | 'vegan'
  | 'vegetable';

export type Product = {
  id: string;
  title: string;
  type: ProductsType;
  description: string;
  image: string;
  price: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};
