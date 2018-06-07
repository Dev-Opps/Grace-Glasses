import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleItemView = (props) => {
  console.log('POKEMON', props);
  return(
  <div className="row justify-content-center">
    <div className="col-5">
      <div id="carouselExampleIndicators" className="carousel slide" data-interval="false">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://static.zennioptical.com/marketing/campaign/premium-sunglasses/Premium-Sunglasses-Men/premium-sunglasses-plp-men-md.jpg" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="http://via.placeholder.com/1185x690" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="http://via.placeholder.com/1185x690" alt="Third slide" />
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
    </div>
    <div className="col-5">
       <div className="card">
         <div className="card-header">
           Brand
         </div>
         <div className="card-body">
           <h5 className="card-title">Item Name</h5>
           <h5 className="card-title">$159.90</h5>
           <p className="card-text">This is where we'll put the item description.</p>
           <a href="#" className="btn btn-primary">ADD TO CART</a> {' '}
           {
             props.isAdmin ?
             <div>
              <a href="#" className="btn btn-danger">DELETE</a>
              <a href="#" className="btn btn-warning">EDIT</a>
             </div>
             : null
           }
         </div>
       </div>
    </div>
  </div>
)}

const mapState = state => {
  return {
    isAdmin: state.user.isAdmin
  };
};

export default connect(mapState)(SingleItemView);
