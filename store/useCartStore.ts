import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  price: number;
  images: any[];
  quantity: number;
};

export type State = {
  cart: Product[];
  totalItems: number;
  totalAmount: number;
  paymentIntentSecret: string;
  customerId: string;
  customerSessionId: string;
};

export type Actions = {
  addToCart: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
  deleteFromCart: (Item: Product) => void;
  setPaymentIntentSecret: (paymentIntentSecret: string) => void;
  setCustomerSessionId: (customerSessionId: string) => void;
  setCustomerId: (customerId: string)  => void;
  resetCart: () => void;
};

const INITIAL_STATE = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  paymentIntentSecret: '',
  customerId: '',
  customerSessionId: '',
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalAmount: INITIAL_STATE.totalAmount,
      paymentIntentSecret: INITIAL_STATE.paymentIntentSecret,
      customerId: INITIAL_STATE.customerId,
      customerSessionId: INITIAL_STATE.customerSessionId,
      addToCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find(
          (item: Product) => item.slug.current === product.slug.current,
        );
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.slug.current === product.slug.current
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalAmount: Math.max(state.totalAmount + product.price, 0),
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalAmount: Math.max(state.totalAmount + product.price, 0),
          }));
        }
      },
      removeFromCart: (product: Product) => {
        const cart = get().cart;
        const cartItem = cart.find(
          (item: Product) => item.slug.current === product.slug.current,
        );
        if (cartItem) {
          const updatedCart = cart
            .map((item) =>
              item.slug.current === product.slug.current
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0);
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalAmount: Math.max(state.totalAmount - product.price, 0),
          }));
        }
      },
      deleteFromCart: (product: Product) => {
        const cart = get().cart;
        const updatedCart = cart.filter(
          (item) => item.slug.current !== product.slug.current,
        );
        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems - product.quantity,
          totalAmount: Math.max(
            state.totalAmount - product.price * product.quantity,
            0,
          ),
        }));
      },
      setPaymentIntentSecret: (paymentIntentSecret: string) => {
        set((state) => ({
          ...state,
          paymentIntentSecret: paymentIntentSecret
        }))
      },
      setCustomerId: (customerId: string) => {
        set((state) => ({
          ...state,
          customerId: customerId
        }))
      },
      setCustomerSessionId: (customerSessionId: string) => {
        set((state) => ({
          ...state,
          customerSessionId: customerSessionId
        }))
      },
      resetCart: () => {
        set(() => ({
          cart: INITIAL_STATE.cart,
          totalItems: INITIAL_STATE.totalItems,
          totalAmount: INITIAL_STATE.totalAmount,
          paymentIntentSecret: INITIAL_STATE.paymentIntentSecret,
        }))
      }
    }),
    {
      name: "cart",
    },
  ),
);
