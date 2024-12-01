export type Review = {
  _id?: string;
  userId?: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt?: string;
};
