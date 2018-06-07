import { connect } from 'react-redux';
import { allGlassesThunk } from './glasses';
import {AllGlasses} from '../components/'
import React from 'react'

const mapStateToProps = state => {
    return {
        allGlasses: state.allGlasses,
        user: state.user.isAdmin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadAllGlasses: () => dispatch(allGlassesThunk())
    }
}

const AllGlassesContainer = connect(mapStateToProps, mapDispatchToProps)(AllGlasses)

export default AllGlassesContainer;
