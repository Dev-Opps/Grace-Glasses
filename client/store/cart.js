import axios from 'axios';
import _ from 'lodash';
import {
  saveItemToLS,
  addOrIncreaseQTY,
  storageAvailable,
  getCartFromLocalStorage,
  removeItemFromLS
} from '../utils';

// TYPE

const GET_ITEMS_FROM_CART = 'GET_ITEMS_FROM_CART';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

// ACTION
const getItemsFromCart = itemsInCart => {
  return {
    type: GET_ITEMS_FROM_CART,
    itemsInCart
  };
};

const addItemToCart = oneItemInCart => {
  return {
    type: ADD_ITEM_TO_CART,
    oneItemInCart
  };
};

const removeItemFromCart = itemId => {
  return {
    type: ADD_ITEM_TO_CART,
    itemId
  };
};

export const removeItemFromCartThunk = itemId => {
  return dispatch => {
    dispatch(removeItemFromCart(itemId))
    removeItemFromLS(itemId)
  }
}

export const addItemToCartThunk = item => {
  return dispatch => {
    dispatch(addItemToCart(item));
    saveItemToLS(item);
  };
};

export const getItemsFromCartThunk = () => {
  return dispatch => {
    let cartFromLS = getCartFromLocalStorage();
    // we send an array of ID's to update info
    let itemsIDs = cartFromLS.map(item => {
      return item.id;
    });
    axios
      .put('/api/glasses/cart-info', itemsIDs)
      .then(res => res.data)
      .then(itemsInfoFromDB => {
        let updatedCartInfo = itemsInfoFromDB.map((item, idx) => {
          return Object.assign(item, cartFromLS[idx]);
        });
        dispatch(getItemsFromCart(updatedCartInfo));
      })
      .catch(err => console.error(err));
  };
};

export default (itemsInCart = [], action) => {
  var cartDeepCopy = _.cloneDeep(itemsInCart);
  switch (action.type) {
    case GET_ITEMS_FROM_CART:
      return action.itemsInCart;
    case ADD_ITEM_TO_CART:
      return addOrIncreaseQTY(cartDeepCopy, action.oneItemInCart);
    case REMOVE_ITEM_FROM_CART:
      return cartDeepCopy.filter(item => item.id !== action.itemId)
      // haven't tested this yet
    default:
      return itemsInCart;
  }
};
