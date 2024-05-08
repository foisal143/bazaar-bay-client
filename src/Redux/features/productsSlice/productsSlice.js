import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice;
