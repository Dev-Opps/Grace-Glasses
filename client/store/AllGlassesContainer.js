import { connect } from 'react-redux';
import { allGlassesThunk } from './glasses';
import {AllGlasses} from '../components/'
import React from 'react'

console.dir(AllGlasses);
const mapStateToProps = state => {
    return {
        allGlasses: state.allGlasses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadAllGlasses: () => dispatch(allGlassesThunk())
    }
}

const AllGlassesContainer = connect(mapStateToProps, mapDispatchToProps)(AllGlasses)

export default AllGlassesContainer;