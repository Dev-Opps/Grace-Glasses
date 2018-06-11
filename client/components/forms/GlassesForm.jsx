import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class GlassesForm extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      description: '',
      price: 0,
      quantity: 0,
      imageUrl: '',
      upc: '',
      shape: '',
      category: 'Kids'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addGlasses = this.addGlasses.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const stateFromLink = props.location.state;
    if (stateFromLink) {
     const newState = Object.assign({}, stateFromLink);
    //  delete newState.id
     return newState;
  }
    }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

   async addGlasses(glasses) {
      const newGlasses = Object.assign({}, glasses)
      delete newGlasses.id
  //FROM can add and edit but doesnt edit update the store's selected glasses so when it rerenders the new data doesn't show up
  //until a refresh
    const operation = glasses.id === '' ? axios.post('/api/glasses', newGlasses) : axios.put(`/api/glasses/${glasses.id}`, glasses)
     await operation
      .then(res => res.data)
      .then(glasses => {
        this.props.history.push(`/glasses/${glasses.id}`)
    })
      .catch(err => console.log(err));
    }

  handleSubmit(evt) {
    evt.preventDefault();
    this.addGlasses(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              className="form-control"
              id="exampleFormControlInput1"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Price</label>
            <input
              type="text"
              name="price"
              value={this.state.price}
              className="form-control"
              id="exampleFormControlInput1"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Quantity</label>
            <input
              type="text"
              name="quantity"
              value={this.state.quantity}
              className="form-control"
              id="exampleFormControlInput1"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">URL</label>
            <input
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              className="form-control"
              id="exampleFormControlInput1"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">UPC</label>
            <input
              type="text"
              name="upc"
              value={this.state.upc}
              className="form-control"
              id="exampleFormControlInput1"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Shape</label>
            <input
              type="text"
              name="shape"
              value={this.state.shape}
              className="form-control"
              id="exampleFormControlInput1"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Category</label>
            <select
              name="category"
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={this.handleChange}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option selected value="Kids">
                Kids
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Description</label>
            <textarea
              name="description"
              value={this.state.description}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
