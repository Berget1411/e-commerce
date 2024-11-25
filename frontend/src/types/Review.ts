export type Review = {
  _id?: string;
  rating: number;
  comment: string;
  productId: string;
  userId?: string;
};
