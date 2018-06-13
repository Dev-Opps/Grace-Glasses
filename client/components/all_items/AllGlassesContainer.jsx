import { connect } from 'react-redux';
import { allGlassesThunk } from '../../store';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GlassesCardView, SelectCategoryMenu } from '../';

class AllGlasses extends Component {
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
  
  render() {
    const { isAdmin, allGlasses } = this.props;

    const unfilteredGlasses = this.props.allGlasses.map(glasses => {
      return <GlassesCardView key={glasses.id} glasses={glasses} />;
    });

    const filteredGlasses = allGlasses
      .filter(glasses => glasses.category === this.state.category)
      .map(glasses => {
        return <GlassesCardView key={glasses.id} glasses={glasses} />;
      });

    const toRender =
      this.state.category === '' ? unfilteredGlasses : filteredGlasses;

    return (
      <div className="container-fluid">
        <SelectCategoryMenu
          isAdmin={isAdmin}
          handleSelect={this.handleSelect}
        />
        <div className="row add-row">{toRender}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allGlasses: state.allGlasses,
    isAdmin: state.user.isAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllGlasses: () => dispatch(allGlassesThunk())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllGlasses);
