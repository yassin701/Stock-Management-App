// store/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Services/axios"; // make sure folder is lowercase

// 1️ Fetch all products

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await API.get("/products");
    return response.data; // returns an array of products
  }
);





// 2️ Add a product

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await API.post("/products", product);
    return response.data; // returns the added product
  }
);


// 3️ Delete a product

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await API.delete(`/products/${id}`);
    return id; // returns the deleted product id
  }
);


//4 Put a product 

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    const res = await API.put(`/products/${product.id}`, product);
    return res.data; // updated product
  }
);



// ==========================
// Slice
// ==========================
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],       // array of all products
    status: "idle",  // "idle" | "loading" | "succeeded" | "failed"
    error: null,     // error message if any
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // -------- FETCH PRODUCTS --------
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

      // -------- ADD PRODUCT --------
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })


      //--------- Put Product --------------
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })


      // -------- DELETE PRODUCT --------
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
