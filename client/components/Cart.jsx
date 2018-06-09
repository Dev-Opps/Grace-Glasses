import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {getItemsFromCartThunk} from '../store'

function CartItemsList(props) {
    
  return (
      <h1>CART</h1>
    // <div id="accordion">
    //   <div className="card">
    //     <div className="card-header" id="headingOne">
    //       <h5 className="mb-0">
    //         <button
    //           className="btn btn-link"
    //           data-toggle="collapse"
    //           data-target="#collapseOne"
    //           aria-expanded="true"
    //           aria-controls="collapseOne"
    //         >
    //           Collapsible Group Item #1
    //         </button>
    //       </h5>
    //     </div>

    //     <div
    //       id="collapseOne"
    //       className="collapse show"
    //       aria-labelledby="headingOne"
    //       data-parent="#accordion"
    //     >
    //       <div className="card-body">
    //         Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
    //         terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
    //         skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
    //         Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
    //         single-origin coffee nulla assumenda shoreditch et. Nihil anim
    //         keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
    //         sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
    //         occaecat craft beer farm-to-table, raw denim aesthetic synth
    //         nesciunt you probably haven't heard of them accusamus labore
    //         sustainable VHS.
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

function CartView(props) {
  const { user } = props;
  // console.log('Items in the cart: CART VIEW', props);
  return (
    <div className="jumbotron">
      <h1 className="display-4">
        Hey, {user ? user.name : `Glasses Lover`}!!!
      </h1>
      <p className="lead">
        Please check your final order before the purchase and we'd love to ship
        it immediately!
      </p>
      <hr className="my-4" />

      {/* When User adds item to the cart we want to invoke a function which will map throug all items and 
        pass data to this component, so it will be rendered as a list.

        Also at the same time we want to save every item ID, its price and qty to our local storage, so it may persist even if the user close the window.
        When we do that we need to simultaneously save it to the Redux store AND local storage, so user can easily work with it (delete add items, change quantity)

        If user wasn't logged in and then decided to log in, we want to send information about his cart 
        (IF CART EXISTS ON THE LOCAL STORAGE) together (or in parralel, right next after) loging request.

        Also every time user is clicking to the cart button in navbar, we want to fetch our data from local storage, send it to the backed for update
        and set recieved response to CURRENT_CART in our store.
        */}

      { props.itemsInCart && props.itemsInCart.map(item => {
        <CartItemsList key={item.id} item={{...item}} />;
      })}

      <p />
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="#" role="button">
          Checkout
        </a>
      </p>
    </div>
  );
}

class CartViewLoader extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadCart()
    console.log('props in the cart after comp is mounted', this.props);
  }

  render() {
    return <CartView props={{...this.props}} />;
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
    loadCart() {
      dispatch(getItemsFromCartThunk())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartViewLoader);
