import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import 'react-notifications/lib/notifications.css'
import 'antd/dist/antd.css'
import 'react-widgets/styles.css'

export default class Root extends Component {
  get content () {
    return (
      <Router>
        {this.props.routes}
      </Router>
    )
  }

  render () {
    return (
      <Provider store={this.props.store}>
        {this.content}
      </Provider>
    )
  }
}

Root.propTypes = {
  routes: PropTypes.element.isRequired,
  store: PropTypes.object.isRequired
}
