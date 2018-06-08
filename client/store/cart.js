import axios from 'axios';

// TYPE

const GET_ITEMS_FROM_CART = 'GET_ITEMS_FROM_CART';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';

// ACTION

const addItemToCart = oneItemInCart => {
  return {
    type: ADD_ITEM_TO_CART,
    oneItemInCart
  };
};

const getItemsFromCart = itemsInCart => {
  return {
    type: GET_ITEMS_FROM_CART,
    itemsInCart
  };
};

export const addItemToCartThunk = item => {
  return dispatch => {
    dispatch(addItemToCart(item));
    console.log(item);
  };
};

export const getItemsFromCartThunk = item => {
  return dispatch => {};
};

// figure out how to reduce same items, not to add duplicates!
export default (itemsInCart = [], action) => {
  switch (action.type) {
    case GET_ITEMS_FROM_CART:
      return action.itemsInCart;
    case ADD_ITEM_TO_CART:
      return [...itemsInCart, action.oneItemInCart];
    default:
      return itemsInCart;
  }
};
