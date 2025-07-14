export type Product = {
  _id: any;
  title: string;
  slug: {
    current: string;
  };
  images: any[];
  size: string;
  color: string;
  weight: string;
  price: number;
  description: string;
  features: string;
  tags: string[];
  category: CategoryForProduct;
  quantity: number;
};

export type CategoryForProduct = {
    _id: string;
    ref: string;
    title: string;
    slug: string;
};

export type StripeCheckoutRequest = {
  products: Product[];
  customerDetails: any;
}

export type StripePaymentRequest = {
  products: { id: string, price: number, quantity: number }[];
}

export type StripePaymentIntentProductMetadata = {
  id: string;
  title: string;
  quantity: number;
  priceOfEach: number;
  totalCost: number;
};

export type Category = {
  title: string;
  slug: {
    current: string;
  };
};