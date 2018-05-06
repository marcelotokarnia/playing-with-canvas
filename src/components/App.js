import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { equals } from 'ramda'
import PropTypes from 'prop-types'
import Canvas from './Canvas'
import Menu from './Menu'
import About from './About'
import Details from './Details'

class App extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
  }
  render() {
    const { activeTab } = this.props
    return (
      <Fragment>
        <h1> Learning Geometry </h1>
        <Canvas />
        <Menu />
        { equals('details', activeTab) && <Details /> }
        { equals('about', activeTab) && <About /> }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  activeTab: state.Menu.activeTab,
})

export default connect(mapStateToProps)(App)
