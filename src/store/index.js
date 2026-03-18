import { createStore } from "redux";

function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem("bazar_products");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
}

function saveToLocalStorage(state) {
  try {
    localStorage.setItem("bazar_products", JSON.stringify(state.products));
  } catch (e) {
    console.error("Saqlashda xatolik:", e);
  }
}

const defaultState = {
  products: loadFromLocalStorage(),
};

const bazarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((_, i) => i !== action.payload),
      };
    case "CLEAR_PRODUCTS":
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};

export const store = createStore(bazarReducer);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
