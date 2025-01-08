import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Cada elemento tendrá { id, name, price, quantity }
  },
  reducers: {
    // Añade un ítem al carrito, o incrementa la cantidad si ya existe
    // payload = product
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity?? 1; // Incrementa la cantidad si ya existe
        if (existingItem.quantity > 10) {
          existingItem.quantity = 10
        }
      } else {
        state.items.push({
          quantity: 1,
          ...action.payload,
        }); // Agrega un nuevo producto con cantidad 1
      }
    },

    // Incrementa la cantidad de un ítem por su id
    // payload = id
    incrementItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    // Decrementa la cantidad de un ítem, y lo elimina si la cantidad es <= 0
    // payload = id
    decrementItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },

    // Elimina un ítem del carrito por su id
    // payload = id
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, incrementItem, decrementItem, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
