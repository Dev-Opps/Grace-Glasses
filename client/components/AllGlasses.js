import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

export default class AllGlasses extends Component {
  constructor() {
    super();
    this.state = {
      glasses: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/glasses")
      .then(res => res.data)
      .then(glasses => {
        console.log(glasses);
        this.setState({ glasses: glasses });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row add-row">
          <div id="category-sorter">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown button
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown button
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown button
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>
          {this.state.glasses.map(glasses => {
            console.log("x", glasses);
            return (
              <div className="col-4" key={glasses.id}>
                <div className="card" id="card">
                  <img
                    className="card-img-top"
                    id="student-card-picture"
                    src={glasses.imageUrl}
                    alt="Card image cap"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{glasses.title}</h5>
                    <h5 className="card-description">{glasses.description}</h5>
                    <Link to={`/glasses/${glasses.id}`}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        id="card-visit"
                      >
                        View glasses
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
