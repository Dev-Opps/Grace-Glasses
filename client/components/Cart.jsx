import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getItemsFromCartThunk, removeItemFromCartThunk } from '../store';

function CartItemsList(props) {
  const {
    id,
    title,
    price,
    quantity,
    upc,
    imageUrl,
    description,
    category,
    shape
  } = props.item;
  return (
    
    <div id="accordion">
      <div className="card">
        <div className="card-header cart-header" id={`heading${id}`}>
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              data-toggle="collapse"
              data-target={`#collapse${id}`}
              aria-expanded="true"
              aria-controls={`collapse${id}`}
            >
              {title}
            </button>
          </h5>
          <span> Quantity: {quantity}</span>
        </div>

        <div
          id={`collapse${id}`}
          className="collapse show"
          aria-labelledby={`heading${id}`}
          data-parent="#accordion"
        >
          <div className="card-body item-body">
            <div>
              <img
                src={imageUrl}
                alt="image here"
                className="item-image-cart"
              />
            </div>

            <ul>
              <li>
                <h4>{upc}</h4>
              </li>
              <Link to={category}>
                <li>
                  <h4>{category}</h4>
                </li>
              </Link>
              <li>
                <h4>{shape}</h4>
              </li>
              <li>
                <h4>{description}</h4>
              </li>
            </ul>

            <div className="remove-button">
              <h3>{`Price: $ ${price}`}</h3>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  props.removeItem(id, props.user)}
                }
              >
                I don't want this anymore!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartView(props) {
  const { user, itemsInCart } = props;
  return (
    <div className="jumbotron">
      <h1 className="display-4">
        Hey, {user.firstName ? user.firstName : `Glasses Lover`}!!!
      </h1>
      <p className="lead">
        Please check your final order before the purchase and we'd love to ship
        it immediately!
      </p>
      <hr className="my-4" />

      {/* If user wasn't logged in and then decided to log in, we want to send information about his cart 
        (IF CART EXISTS ON THE LOCAL STORAGE) together (or in parralel, right next after) loging request.

        Also every time user is clicking to the cart button in navbar, we want to fetch our data from local storage, send it to the backed for update
        and set recieved response to CURRENT_CART in our store.
        */}

      {itemsInCart && itemsInCart.length
        ? itemsInCart.map(item => {
            return (
              <CartItemsList
                key={item.id}
                item={item}
                removeItem={props.removeItem}
                user={user}
              />
            );
          })
        : 'No items in the cart yet!'}

      <p />

      <p className="lead lead-body">
        <a className="btn btn-primary btn-lg" href="#" role="button">
          Let's checkout!
        </a>
        <span>
          Your subtotal is:{' '}
          <b>
            ${itemsInCart.reduce((prev, curr) => {
              return prev + curr.price * curr.quantity;
            }, 0)}
          </b>
        </span>
      </p>
    </div>
  );
}

class CartViewLoader extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.loadCart(this.props.user);
  }
  render() {
    return (
      <CartView
        itemsInCart={this.props.itemsInCart}
        user={this.props.user}
        removeItem={this.props.removeItem}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    itemsInCart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCart(user) {
      dispatch(getItemsFromCartThunk(user));
    },
    removeItem(itemID, user) {
      dispatch(removeItemFromCartThunk(itemID, user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartViewLoader);
