import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      userInput: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    let inputLen = this.state.userInput.length;
    this.setState({userInput: ev.target.value});

    if (inputLen === 1) {
      this.props.loadAllGlasses();
    }
    else {
      this.props.sendSearchInput(this.state.userInput);
    }
  }

  render() {
    return (
      <div>
        <input value={this.state.userInput} onChange={this.handleChange} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      </div>
    )
  }
}

export default SearchBar;
