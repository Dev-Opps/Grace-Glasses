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
  };
};

// assuming that we have the cart object saved to local storage
// we want to get that object from LS and save it to the state as a cart
    // this may include several moves
      // because we save only:
        // itemID
        // QTY (make sure that user can see if items out of stock)
      // we want to get this from local storage, 
      // THEN make ajax call to DB, and get the rest of info about certain item
      // merge the object we have with the object we recieve (handle qty on the frontend during merging)
      // then set this object as a cart to our state


export const getItemsFromCartThunk = () => {
  return dispatch => {
    console.log('We loaded a cart view')
    console.log('cart from LS', getCartFromLocalStorage())

    let cartFromLS = getCartFromLocalStorage()
    // we send an array of ID's to update info
    let itemsIDs = cartFromLS.map(item => {
      return { id : item.id }
    })

    axios.put('/api/glasses/cartInfo', itemsIDs)
      .then(res => res.data)
      .then(itemsInfoFromDB => {
        // we assume an array of glasses objects without QTY
        let updatedCartInfo = cartitemsInfoFromDB.map((item, idx) => {
          return Object.assign(item, cartFromLS[idx])
        })
        // now we ready to set it to our store
        dispatch(getItemsFromCart(updatedCartInfo))
      })
      .catch(err => console.error(err))

  };
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

// will go to utils =====|
//                       V       

function getCartFromLocalStorage() {
  if (storageAvailable('localStorage')) {
    return window['localStorage'].cart ?
    JSON.parse(window['localStorage'].getItem('cart')) : []
  } else {
    console.log('local storage', 'Too bad, no localStorage for us :(')
  } 
}

function storageAvailable(type) {
  try {
      var storage = window[type],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage.length !== 0;
  }
}