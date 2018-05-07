import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { equals } from 'ramda'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import updateMenu from '../actions/Menu'

class Menu extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    updateMenu: PropTypes.func.isRequired,
  }

  handleClick = activeTab => () => {
    this.props.updateMenu({ activeTab })
  }

  render() {
    const { activeTab } = this.props
    return (
      <div className="flex-row small-vertical-margin">
        <button
          className={classnames('flex1 center small-horizontal-margin round-border', {
            'back-color-dark': equals('details', activeTab),
            'pointer back-color-light': !equals('details', activeTab),
          })}
          onClick={this.handleClick('details')}
        >
          DETAILS OF CANVAS
        </button>
        <button
          className={classnames('flex1 center small-horizontal-margin round-border', {
            'back-color-dark': equals('about', activeTab),
            'pointer back-color-light': !equals('about', activeTab),
          })}
          onClick={this.handleClick('about')}
        >
          ABOUT THE APP
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeTab: state.Menu.activeTab,
})

const mapDispatchToProps = dispatch => ({
  updateMenu: bindActionCreators(updateMenu, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

