import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, AllGlassesContainer, SingleItemContainer, GlassesForm, Homepage, Cart } from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {
          isAdmin && <Route path="/admin/form" component={GlassesForm} />
        }
        {
          isLoggedIn &&
          <Route path="/account" component={UserHome} />
        }
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/glasses/:id" component={SingleItemContainer} />
        <Route path="/all" component={AllGlassesContainer} />
        <Route path="/cart" component={Cart} />
        <Route path="/" component={Homepage} />
        {/* Displays our Homepage component as a fallback */}
        <Route component={Homepage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
