import React, { Component } from 'react';
import { submitReviewThunk } from '../../store';
import { connect } from 'react-redux';

class ReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      body: '',
      rating: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({[ev.target.name]: ev.target.value})
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.props.submitReview({...this.state, glassId: this.props.singleGlasses.id})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Write a customer review</label>
            <textarea rows="3" cols="60" type="text" name="body" value={this.state.body} onChange={this.handleChange} />
          <label>Rating</label>
            <input placeholder="# from 1-10" type="text" name="rating" value={this.state.rating} onChange={this.handleChange} />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleGlasses: state.singleGlasses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitReview: input => dispatch(submitReviewThunk(input))
  }
}

const ReviewFormContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewForm);

export default ReviewFormContainer;
