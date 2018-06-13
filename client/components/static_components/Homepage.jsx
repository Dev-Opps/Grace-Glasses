import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        />
        <li data-target="#carouselExampleIndicators" data-slide-to="1" />
        <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        <li data-target="#carouselExampleIndicators" data-slide-to="3" />
        <li data-target="#carouselExampleIndicators" data-slide-to="3" />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src="https://i.imgur.com/OZkckUB.jpg"
            alt="First slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Summer Vacation Must-Haves</h5>
            <Link to="/all">
              <button type="button" className="btn btn-info">
                SHOP WHILE THEY LASTS!
              </button>
            </Link>
          </div>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://i.imgur.com/CJmx7QD.jpg"
            alt="Second slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>SUNGLASSES UNDER $20</h5>
            <Link to="/all">
              <button type="button" className="btn btn-info">
                SHOP
              </button>
            </Link>
          </div>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://i.imgur.com/h4u2j2j.jpg"
            alt="Third slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>BESTSELLERS</h5>
            <Link to="/all">
              <button type="button" className="btn btn-info">
                SHOP
              </button>
            </Link>
          </div>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://i.imgur.com/q41esSq.jpg"
            alt="Fourth slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>BESTSELLERS</h5>
            <Link to="/all">
              <button type="button" className="btn btn-info">
                SHOP
              </button>
            </Link>
          </div>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://i.imgur.com/vuOGwjB.jpg"
            alt="Fifth slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>BESTSELLERS</h5>
            <Link to="/all">
              <button type="button" className="btn btn-info">
                SHOP
              </button>
            </Link>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Homepage;
