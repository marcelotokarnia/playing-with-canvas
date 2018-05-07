import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { reject, isNil, equals } from 'ramda'
import { POINT_PROP } from './Canvas'


const TIP = '* Circle and Parallelogram have same Area and Center'

class Details extends Component {
  static propTypes = {
    center: PropTypes.shape(POINT_PROP),
    area: PropTypes.number,
    points: PropTypes.arrayOf(
      PropTypes.shape(POINT_PROP),
    ).isRequired,
    P3: PropTypes.shape(POINT_PROP),
  }

  static defaultProps = {
    center: null,
    area: null,
    P3: null,
  }

  render() {
    const {
      area,
      points,
      center,
      P3,
    } = this.props
    const canCalculateOutput = equals(3, reject(isNil, points).length)
    return (
      <div className="flex-row">
        <div className="flex1">
          <h3> User Input </h3>
          {reject(isNil, points).map(({ x, y }, i) => (
            <div className="flex-row" key={i}>
              <div className="flex1 align-right small-horizontal-margin">P{i}</div>
              <div className={classnames(
                { flex1: !canCalculateOutput, flex2: canCalculateOutput },
                'align-left small-horizontal-margin',
              )}
              >
                ({x}, {y})
              </div>
            </div>
          ))}
        </div>
        {canCalculateOutput && (
          <div className="flex1">
            <h3> Calculated Outputs </h3>
            <div className="flex-row">
              <div className="flex1 align-right small-horizontal-margin">P3</div>
              <div className="flex1 align-left small-horizontal-margin">({P3.x}, {P3.y})</div>
            </div>
            <div className="flex-row" title={TIP}>
              <div className="flex1 align-right small-horizontal-margin">Centers*</div>
              <div className="flex1 align-left small-horizontal-margin">({center.x}, {center.y})</div>
            </div>
            <div className="flex-row" title={TIP}>
              <div className="flex1 align-right small-horizontal-margin">Areas*</div>
              <div className="flex1 align-left small-horizontal-margin">{Math.round(area)} px²</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  points: state.Canvas.points,
  center: state.Canvas.center,
  P3: state.Canvas.P3,
  area: state.Canvas.area,
})

export default connect(mapStateToProps)(Details)
