import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface Store {
  cart: CartItem[];
  isCartOpen: boolean;
  isDarkMode: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleCart: () => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>((set) => ({
  cart: [],
  isCartOpen: false,
  isDarkMode: false,
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));