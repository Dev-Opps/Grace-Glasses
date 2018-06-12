import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';

const Navbar = props => {
  const { handleClick, isLoggedIn, isAdmin } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Homepage
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/all" className="nav-link">
              All
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/all/Men" className="nav-link">
              Men
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/all/Women" className="nav-link">
              Women
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/all/Kids" className="nav-link">
              Kids
            </Link>
          </li>
        </ul>
        <Link to="/cart">
          <button type="button" className="btn btn-info">
            Cart
            {' '}
            <span className="badge badge-light">
              {props.numberOfItemsInCart()}
            </span>
          </button>
        </Link>
        {isAdmin ? <Link to="/admin/form">Admin Dashboard</Link> : null}
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/account">Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    numberOfItemsInCart: () => {
      return state.cart.reduce((prev, next) => {
        return prev + next.quantity;
      }, 0);
    },
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
