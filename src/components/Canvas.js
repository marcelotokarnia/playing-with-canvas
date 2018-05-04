import React, { Component, createRef } from 'react'
import { cond, equals, update, addIndex, forEach, reject, isNil } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import updateCanvas from '../actions/Canvas'

const RED = '#FF0000'
const BLUE = '#0000FF'
const YELLOW = '#FFFF00'

const POINT_PROP = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

class Canvas extends Component {
  static propTypes = {
    center: PropTypes.shape(POINT_PROP),
    area: PropTypes.number,
    points: PropTypes.arrayOf(
      PropTypes.shape(POINT_PROP),
    ).isRequired,
    P3: PropTypes.shape(POINT_PROP),
    updateCanvas: PropTypes.func.isRequired,
  }

  static defaultProps = {
    center: null,
    area: null,
    P3: null,
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d')
  }

  componentDidUpdate() {
    this.clearCanvas()
    const circles = this.drawRedCircles()
    cond([
      [
        equals(3),
        () => {
          this.drawParallelogram()
          const { center, area } = this.props
          this.drawYellowCircle(center, area)
        },
      ],
    ])(circles.length)
  }

  canvas = createRef()

  draw = (fn) => {
    this.ctx.beginPath()
    fn()
    this.ctx.stroke()
  }

  changeColor = color => this.ctx.strokeStyle = color

  drawYellowCircle = ({ x, y }, area) => {
    this.changeColor(YELLOW)
    const R = Math.sqrt(area / Math.PI)
    this.draw(() => this.ctx.arc(x, y, R, 0, 2 * Math.PI))
  }

  clearCanvas = () => this.ctx.clearRect(
    0, 0, this.canvas.current.width, this.canvas.current.height,
  )

  updateReferences = async (e) => {
    const { reference } = this.props
    const points = update(
      reference % 3,
      { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
      [...this.props.points],
    )
    const updatedState = {
      points,
      reference: reference + 1,
    }
    if (equals(3)(reject(isNil, points).length)) {
      updatedState.P3 = this.calculateLastPoint(points)
      updatedState.area = this.calculateArea(points, updatedState.P3)
      updatedState.center = this.calculateCenter(points)
    }
    this.props.updateCanvas(updatedState)
  }

  drawRedCircles = () => {
    this.changeColor(RED)
    const circles = reject(isNil, this.props.points)
    forEach(({ x, y }) => {
      this.draw(() => this.ctx.arc(x, y, 11, 0, 2 * Math.PI))
    })(circles)
    return circles
  }

  calculateLastPoint = (points) => {
    const [{ x: x0, y: y0 }, { x: x1, y: y1 }, { x: x2, y: y2 }] = points
    return {
      x: x0 + (x2 - x1),
      y: y0 + (y2 - y1),
    }
  }

  calculateCenter = (points) => {
    const [{ x: x0, y: y0 },, { x: x2, y: y2 }] = points
    return {
      x: x0 + (x2 - x0) / 2,
      y: y0 + (y2 - y0) / 2,
    }
  }

  distanceBetweenPoints = (P0, P1) => Math.sqrt(
    (P0.x - P1.x) ** 2 + (P0.y - P1.y) ** 2,
  )

  distanceBetweenPointAndLine = (P0, L1, L2) => Math.abs(
    ((L2.y - L1.y) * P0.x) - ((L2.x - L1.x) * P0.y) + (L2.x * L1.y) - (L2.y * L1.x),
  ) / this.distanceBetweenPoints(L1, L2)

  calculateArea = (points, P3) => {
    const [P0, P1, P2] = points
    const base = this.distanceBetweenPoints(P0, P1)
    const height = this.distanceBetweenPointAndLine(P0, P2, P3)
    return base * height
  }

  drawParallelogram = () => {
    this.changeColor(BLUE)
    const { points, P3 } = this.props
    const parallelogramsVerts = [...points, P3]
    addIndex(forEach)(({ x, y }, i) => {
      const { x: fromX, y: fromY } = parallelogramsVerts[(i + 1) % 4]
      this.draw(() => {
        this.ctx.moveTo(fromX, fromY)
        this.ctx.lineTo(x, y)
      })
    })(parallelogramsVerts)
  }

  render() {
    return (
      <div className="canvas-container">
        <canvas width="800" height="400" ref={this.canvas} onMouseDown={this.updateReferences}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  points: state.Canvas.points,
  reference: state.Canvas.reference,
  center: state.Canvas.center,
  P3: state.Canvas.P3,
  area: state.Canvas.area,
})

const mapDispatchToProps = dispatch => ({
  updateCanvas: bindActionCreators(updateCanvas, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
