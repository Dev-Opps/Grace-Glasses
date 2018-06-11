export const getCartFromLocalStorage = () => {
  if (storageAvailable('localStorage')) {
    return window['localStorage'].cart
      ? JSON.parse(window['localStorage'].getItem('cart'))
      : [];
  } else {
    console.log('local storage', 'Too bad, no localStorage for us :(');
  }
}

export const storageAvailable = type => {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
}

export const  addOrIncreaseQTY = (itemsInCart, newItem) => {
  var noMatch = true;
  itemsInCart = itemsInCart.map(item => {
    if (item.id == newItem.id) {
      item.quantity++;
      noMatch = false;
      return item;
    }
    return item;
  });
  if (noMatch) {
    itemsInCart.push(newItem);
  }
  return itemsInCart;
}

export const saveItemToLS = item =>  {
  //cart is an array of objects {id : 1, quantity: 1}
  let itemForLS = { id: item.id, quantity: item.quantity };
  let updatedCartObj = addOrIncreaseQTY(getCartFromLocalStorage(), item);
  setToLocalStorage(updatedCartObj);
}

export const removeItemFromLS = itemID => {
  let updatedCart = getCartFromLocalStorage().filter(item => item.id != itemID)
  setToLocalStorage(updatedCart)
}

const setToLocalStorage = cart => {
  window['localStorage'].setItem('cart', JSON.stringify(cart));
}
