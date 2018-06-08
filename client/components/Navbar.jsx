import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav />
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/all">
      <a className="navbar-brand" href="#">
        LOGO
      </a>
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
          <li className="nav-item">
            <Link to="/all">
              <div className="nav-link">All</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/all/Men">
              <div className="nav-link">Men</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/all/Women">
              <div className="nav-link">Women</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/all/Kids">
              <div className="nav-link">Kids</div>
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-secondary my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
          <button type="button" className="btn btn-info">
            Cart <span className="badge badge-light">9</span>
            <span className="sr-only">unread messages</span>
          </button>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
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
        </form>
      </div>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
