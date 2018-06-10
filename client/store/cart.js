import axios from 'axios';
import _ from 'lodash'
import { saveItemToLS, addOrIncreaseQTY, storageAvailable, getCartFromLocalStorage } from '../utils'

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
    saveItemToLS(item)
  };
};

export const getItemsFromCartThunk = () => {
  return dispatch => {
    console.log('We loaded a cart view')
    console.log('cart from LS', getCartFromLocalStorage())

    let cartFromLS = getCartFromLocalStorage()
    // we send an array of ID's to update info
    let itemsIDs = cartFromLS.map(item => {
      return item.id
    })

    axios.put('/api/glasses/cart-info', itemsIDs)
    // we send an array of ids
      .then(res => res.data)
      .then(itemsInfoFromDB => {
        // we assume an array of glasses objects without QTY
        let updatedCartInfo = itemsInfoFromDB.map((item, idx) => {
          return Object.assign(item, cartFromLS[idx])
        })
        // now we ready to set it to our store
        dispatch(getItemsFromCart(updatedCartInfo))
      })
      .catch(err => console.error(err))

  };
};

export default (itemsInCart = [], action) => {
  var cartDeepCopy = _.cloneDeep(itemsInCart)
  switch (action.type) {
    case GET_ITEMS_FROM_CART:
      return action.itemsInCart;
    case ADD_ITEM_TO_CART:
      return addOrIncreaseQTY(cartDeepCopy, action.oneItemInCart)
    default:
      return itemsInCart;
  }
};

      
      
 