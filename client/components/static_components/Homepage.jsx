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
          <img className="d-block w-100" src="https://scontent.xx.fbcdn.net/v/t1.15752-0/p480x480/35135024_10160539542870137_6421781864859566080_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=7947330db9eba4457c079dbf82769531&oe=5B7B99B6" alt="First slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Summer Vacation Must-Haves</h5>
            <button type="button" className="btn btn-info">SHOP WHILE THEY LASTS!</button>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="https://scontent.xx.fbcdn.net/v/t1.15752-0/p480x480/35143718_10160539533770137_2266728089213992960_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=a3c33bf65c34fc8bf3629e1e7cecb686&oe=5B7B1F89" alt="Second slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>SUNGLASSES UNDER $20</h5>
            <button type="button" className="btn btn-info">SHOP</button>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="https://scontent.xx.fbcdn.net/v/t1.15752-0/p480x480/35077296_10160539549325137_1605555828620787712_n.jpg?_nc_cat=0&_nc_ad=z-m&_nc_cid=0&oh=f1f01ac1f1ea85f7039558dc3315beb3&oe=5BAFEC1C" alt="Third slide" />
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
