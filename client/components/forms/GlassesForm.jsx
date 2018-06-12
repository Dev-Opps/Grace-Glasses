import React, { Component } from 'react';
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
      category: 'Kids',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addGlasses = this.addGlasses.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleAdminStatus = this.handleAdminStatus.bind(this);
    this.handleAdminSubmit = this.handleAdminSubmit.bind(this);
    this.handleDeleteSubmission = this.handleDeleteSubmission.bind(this);

    this.email = '';
    this.isAdmin = '';
  }

  static getDerivedStateFromProps(props, state) {
    const stateFromLink = props.location.state;
    if (stateFromLink) {
     const newState = Object.assign({}, stateFromLink);
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
      .then(gotGlasses => {
        this.props.history.push(`/glasses/${gotGlasses.id}`)
    })
      .catch(err => console.log(err));
    }

  handleSubmit(evt) {
    evt.preventDefault();
    this.addGlasses(this.state);
  }

  handleEmail(event){
    this.email = event.target.value;
  }

  handleAdminStatus(event){
    this.isAdmin = event.target.value;
  }

  async handleDeleteSubmission(event) {
    event.preventDefault();
    let targetId;

    await axios.get(`/api/users/${this.email}`)
      .then(res => res.data)
      .then(foundUser => {
        targetId = foundUser.id
      })
      .catch(err => console.log(err))

    axios.delete(`/api/users/${targetId}`)
      .then(res => res.data)
      .then(deletedUser => console.log('edit', deletedUser))
      .catch(err => console.log(err))

    alert(`${this.email} was deleted.`)
  }

  async handleAdminSubmit(event){
    event.preventDefault();
    let targetId;

    await axios.get(`/api/users/${this.email}`)
    .then(res => res.data)
    .then(foundUser => {
      targetId = foundUser.id
    })
    .catch(err => console.log(err))

    axios.put(`/api/users/${targetId}`, {isAdmin: this.isAdmin})
    .then(res => res.data)
    .then(editedUser => console.log('edit', editedUser))
    .catch(err => console.log(err))
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
              <option value="Kids">
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
        <form>
          <label>Add Admin</label>
          <label>New Admin's Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={this.handleEmail}
          />
          <label>Admin Status</label>
          <input
            type="text"
            name="status"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={this.handleAdminStatus}
          />
          <button onSubmit={this.handleAdminSubmit} type="submit" className="btn btn-primary">
            Submit
          </button>
          <button onSubmit={this.handleDeleteSubmission} type="submit" className="userDeleteBtn btn btn-danger">

            Delete
          </button>
        </form>
      </div>
    );
  }
}
