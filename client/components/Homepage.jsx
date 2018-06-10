import React from 'react';

const Homepage = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src="http://via.placeholder.com/1920x900" alt="First slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Summer Vacation Must-Haves</h5>
            <button type="button" className="btn btn-info">SHOP WHILE THEY LASTS!</button>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="http://via.placeholder.com/1920x900" alt="Second slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>SUNGLASSES UNDER $20</h5>
            <button type="button" className="btn btn-info">SHOP</button>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="http://via.placeholder.com/1920x900" alt="Third slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>BESTSELLERS</h5>
            <button type="button" className="btn btn-info">SHOP</button>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
}

export default Homepage;
