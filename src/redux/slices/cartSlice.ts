import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
    id: number,
    title: string,
    img: string,
    capacity: string,
    sku: string,
    price: number,
    count: number
}

interface CartSliceState {
    items: CartItem[],
    totalPrice: number
}
// @ts-ignore
const storageCart = JSON.parse(window.localStorage.getItem('cart'));
console.log(typeof storageCart);
console.log( storageCart);


const initialState: CartSliceState = {
    items: storageCart || [] ,
    totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCard: (state, action: PayloadAction<CartItem>) => {
        const findItem: any = state.items.find((obj) => obj.id === action.payload.id);
        if (findItem) {
          findItem.count = action.payload.count;
        } else {
          state.items.push({
            ...action.payload,
            //count: 1,
          });
        }
  
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);

        localStorage.setItem('cart', JSON.stringify(state.items));
      },
  
      plusItem: (state, action: PayloadAction<string>) => {
        const findItem = state.items.find((obj) => obj.id === Number(action.payload));
        if (findItem) {
          findItem.count++;
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
        localStorage.setItem('cart', JSON.stringify(state.items));
      },
  
      minusItem: (state, action: PayloadAction<number>) => {
        const findItem = state.items.find((obj) => obj.id === action.payload);
        if (findItem) {
          findItem.count--;
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
        localStorage.setItem('cart', JSON.stringify(state.items));
      },
      removeItem: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
        localStorage.setItem('cart', JSON.stringify(state.items));
      },
      clearItems: (state) => {
        state.items = [];
        state.totalPrice = 0;
      },
  },

});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find((obj: any) => obj.id === id);
export const { addToCard, removeItem, clearItems, minusItem, plusItem } = cartSlice.actions;
export default cartSlice.reducer;
