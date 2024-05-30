import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const { data } = await axios(`${process.env.REACT_APP_API_URL}/api/products/getProducts`);
  console.log(data);
  return data ;
});

// export const fetchProductsImages = createAsyncThunk('pizza/fetchProductsImages', async () => {
//   const { data } = await axios('https://api.noguchi.com.ua/wp-json/wp/v2/media?per_page=100');
//   console.log(data);
//   return data ;
// });


enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
  }

interface ProductsSliceState {
  items: [];
  images: [];
  status: 'loading' | 'success' | "error";
  activeCategory: string;
}

const initialState: ProductsSliceState = {
  items: [],
  images: [],
  status: Status.LOADING,
  activeCategory: ''
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    })
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = 'error';
    })
   
  }
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error';
  //   },
  // },
});

export const selectProducts = (state: RootState) => state.products;
// Action creators are generated for each case reducer function
export const { setActiveCategory } = productsSlice.actions;

export default productsSlice.reducer;
