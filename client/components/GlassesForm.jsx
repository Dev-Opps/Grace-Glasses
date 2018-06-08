import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { submitGlassesThunk } from '../store';
import axios from 'axios';

export default class GlassesForm extends Component {

  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      price: 0,
      quantity: 0,
      imageUrl: "",
      upc: "",
      shape: "",
      category: "Kids"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addGlasses = this.addGlasses.bind(this);
  }

  handleChange(ev) {
    console.log("before", this.state);
    this.setState({[ev.target.name]: ev.target.value});
    console.log("after", this.state);
  }

  addGlasses(glasses) {
    axios
    .post("/api/glasses", glasses)
    .then(res => res.data)
    .then(glasses => console.log("glasses"))
    .catch(err => console.log(err));
    }

  handleSubmit() {
    this.addGlasses(this.state);
  }

  render() {
    console.log("from render", this.state)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="exampleFormControlInput1">Title</label>
            <input type="text" name="title" value={this.state.title} className="form-control" id="exampleFormControlInput1" required onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Price</label>
            <input type="text" name="price" value={this.state.price} className="form-control" id="exampleFormControlInput1" required onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Quantity</label>
            <input type="text" name="quantity" value={this.state.quantity} className="form-control" id="exampleFormControlInput1" onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">URL</label>
            <input type="text" name="imageUrl" value={this.state.imageUrl} className="form-control" id="exampleFormControlInput1" onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">UPC</label>
            <input type="text" name="upc" value={this.state.upc} className="form-control" id="exampleFormControlInput1" onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label for="exampleFormControlInput1">Shape</label>
            <input type="text" name="shape" value={this.state.shape} className="form-control" id="exampleFormControlInput1" onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label for="exampleFormControlSelect1">Category</label>
            <select name="category" className="form-control" id="exampleFormControlSelect1" onChange={this.handleChange}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option selected value="Kids">Kids</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea name="description" value={this.state.description} className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleChange}></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }

};
