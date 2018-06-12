import axios from 'axios';
import _ from 'lodash';
import {
  saveItemToLS,
  addOrIncreaseQTY,
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
    type: REMOVE_ITEM_FROM_CART,
    itemId
  };
};

export const removeItemFromCartThunk = (itemId, user) => {
  return dispatch => {
    dispatch(removeItemFromCart(itemId));
    removeItemFromLS(itemId);
    if (user.id) {
      axios
        .delete(`/api/users/${user.id}/delete-from-cart/${itemId}`)
        .then(res => console.log('item deleted from cart', res.status))
        .catch(err => console.log(err));
    }
  };
};

export const addItemToCartThunk = (item, user) => {
  return dispatch => {
    // what if we have network error? Need to move it inside then?
    dispatch(addItemToCart(item));
    saveItemToLS(item);
    if (user.id) {
      axios
        .post(`/api/users/${user.id}/add-to-cart`, item)
        .then(res => console.log('item added to backend cart', res.status))
        .catch(err => console.log(err));
    }
  };
};

export const getItemsFromCartThunk = user => {
  let itemsIDs;
  console.log('from thunk', user);
  return dispatch => {
    const cartFromLS = getCartFromLocalStorage();
    // we send an array of ID's to update info
    itemsIDs = cartFromLS.map(item => {
      return item.id;
    });
    if (!user) {
      axios
        .put('/api/glasses/cart-info', itemsIDs)
        .then(res => res.data)
        .then(itemsInfoFromDB => {
          let updatedCartInfo = itemsInfoFromDB.map((item, idx) => {
            return Object.assign({}, item, cartFromLS[idx]);
          });
          dispatch(getItemsFromCart(updatedCartInfo));
        })
        .catch(err => console.error(err));
    } else {
      // console.log("!!!!!userid",user.id)
      axios
        .get(`/api/users/${user.id}/sync-cart`)
        .then(res => res.data)
        .then(cartFromBackEnd => dispatch(getItemsFromCart(cartFromBackEnd)))
        .catch(err => console.error(err));
    }

    // else {
    //   axios
    //   .put(`/api/users/${user.id}/sync-cart`, itemsIDs)
    //   .then(res => res.data)
    //   .then(items => console.log(items))
    //   .catch(err => console.log(err))
    // }
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
      return cartDeepCopy.filter(item => item.id != action.itemId);
    default:
      return itemsInCart;
  }
};
