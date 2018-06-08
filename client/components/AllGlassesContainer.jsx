import { connect } from 'react-redux';
import { allGlassesThunk } from '../store';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class AllGlasses extends Component {
  constructor() {
    super();
    this.state = {
      category: ''
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let targetCategory = props.location.pathname.slice(5);
    if (state.category !== targetCategory) {
      return {
        category: targetCategory
      };
    }
  }

  componentDidMount() {
    this.props.loadAllGlasses();
  }

  handleSelect(ev) {
    this.setState({ category: ev.target.value });
  }
  // Best way to pass in props to generate single view page when button is clicked is by passing in the props to the Link's state (but I can't get it to work).
  render() {
    let addGlassesBtn = this.props.user ? (
      <button className="btn btn-primary">+</button>
    ) : null;
    let filteredGlasses = this.props.allGlasses
      .filter(glasses => glasses.category === this.state.category)
      .map(glasses => {
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
                <Link
                  to={{
                    pathname: `/glasses/${glasses.id}`,
                    state: glasses.id
                  }}
                >
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
      });
    let unfilteredGlasses = this.props.allGlasses.map(glasses => {
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

              {/* it requires double brackets, because it's the Link
                            to an object: https://reacttraining.com/react-router/web/api/Link
  
                            However we need to configure it differently, 
                            because we'll not recive any state if we paste the link to URL bar directly.
                             */}

              <Link
                to={{
                  pathname: `/glasses/${glasses.id}`,
                  state: glasses.id
                }}
              >
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
    });

    let toRender =
      this.state.category === '' ? unfilteredGlasses : filteredGlasses;

    return (
      <div className="container-fluid">
        <div className="row add-row">
          <form>
            <div className="form-group">
              <select
                className="form-control"
                aria-labelledby="dropdownMenuButton"
                onChange={this.handleSelect}
              >
                <option className="dropdown-item" href="#" value="">
                  All
                </option>
                <option className="dropdown-item" href="#" value="Men">
                  Men
                </option>
                <option className="dropdown-item" href="#" value="Women">
                  Women
                </option>
                <option className="dropdown-item" href="#" value="Kids">
                  Kids
                </option>
              </select>
            </div>
          </form>
          <Link to="/glasses/form">{addGlassesBtn}</Link>
        </div>

        <div className="row add-row">{toRender}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allGlasses: state.allGlasses,
    user: state.user.isAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllGlasses: () => dispatch(allGlassesThunk())
  };
};

const AllGlassesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllGlasses);
export default AllGlassesContainer;