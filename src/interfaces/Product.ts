export interface Product {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
}

export interface ProductInCart {
  product: Product;
  count: number;
}