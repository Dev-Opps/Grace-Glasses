import { connect } from 'react-redux';
import { SearchBar } from './';
import { grabSearchedGlassesThunk, allGlassesThunk } from '../store'

const mapDispatchToProps = dispatch => {
  return {
    sendSearchInput: (input) => dispatch(grabSearchedGlassesThunk(input)),
    loadAllGlasses: () => dispatch(allGlassesThunk())
  }
}

const SearchBarContainer = connect(null, mapDispatchToProps)(SearchBar);

export default SearchBarContainer;
