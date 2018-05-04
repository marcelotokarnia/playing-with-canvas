import React, { Component, Fragment } from 'react'
import Canvas from './Canvas'
import Menu from './Menu'
import About from './About'
import Details from './Details'

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1> Learning Geometry </h1>
        <Canvas />
        <Menu clickOption={this.handleClickMenu} />
        { this.activeMenu === 'details' && <Details /> }
        { this.activeMenu === 'about' && <About /> }
      </Fragment>
    )
  }
}

export default App
