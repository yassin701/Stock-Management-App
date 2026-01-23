import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "./ProductsSlice";
import API from "../Services/axios";

// mock global fetch

jest.mock("../Services/axios"); 

describe("Products Slice - fetchProducts", () => {
  test("should fetch products and update the store", async () => {
    const mockProducts = [
      { id: 1, name: "Iphone 13", price: 300 },
      { id: 2, name: "Samsung S23", price: 250 },
    ];

    // mock API response
   API.get.mockResolvedValueOnce({
      data: mockProducts,
    });

    const store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });

    // dispatch async thunk
    await store.dispatch(fetchProducts());

    const state = store.getState().products;

    expect(state.status).toBe("succeeded"); // ✅
    expect(state.items.length).toBe(2);     // ✅
    expect(state.items[0].name).toBe("Iphone 13");
  });
});
