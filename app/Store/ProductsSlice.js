import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Services/axios";
import localData from "../../db.json";

/* ======================
   THUNKS
====================== */

// FETCH PRODUCTS
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    try {
      const res = await API.get("/products");
      return res.data;
    } catch (error) {
      // fallback to local db.json
      console.warn("API failed, loading local data");
      return localData.products;
    }
  }
);

// ADD PRODUCT
export const addProduct = createAsyncThunk(
  "products/add",
  async (product) => {
    const res = await API.post("/products", product);
    return res.data;
  }
);

// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "products/update",
  async (product) => {
    const res = await API.put(`/products/${product.id}`, product);
    return res.data;
  }
);

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id) => {
    await API.delete(`/products/${id}`);
    return id;
  }
);

/* ======================
        SLICE
====================== */

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ADD
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.items[index] = action.payload;
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default productsSlice.reducer;
