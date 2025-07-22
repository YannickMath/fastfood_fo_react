export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productDescription?: string;
  productPrice: number;
  quantity: number;
  image?: string;
  category?: number;
}
