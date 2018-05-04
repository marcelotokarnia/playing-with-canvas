import React, { Component, createRef } from 'react'
import { cond, equals, update, addIndex, forEach, reject, isNil } from 'ramda'

const RED = '#FF0000'
const BLUE = '#0000FF'
const YELLOW = '#FFFF00'

class Canvas extends Component {
  constructor() {
    super()
    this.state = {
      points: Array(3),
      reference: 0,
    }
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
          const { center, area } = this.drawParallelogram()
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

  clearCanvas = () => this.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height)

  updateReferences = async (e) => {
    const points = [...this.state.points]
    const { reference } = this.state
    await this.setState({
      points: update(reference % 3, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }, points),
      reference: reference + 1,
    })
  }

  drawRedCircles = () => {
    this.changeColor(RED)
    const circles = reject(isNil, this.state.points)
    forEach(({ x, y }) => {
      this.draw(() => this.ctx.arc(x, y, 11, 0, 2 * Math.PI))
    })(circles)
    return circles
  }

  calculateLastPoint = () => {
    const [{ x: x0, y: y0 }, { x: x1, y: y1 }, { x: x2, y: y2 }] = this.state.points
    return {
      x: x0 + (x2 - x1),
      y: y0 + (y2 - y1),
    }
  }

  calculateCenter = () => {
    const [{ x: x0, y: y0 },, { x: x2, y: y2 }] = this.state.points
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

  calculateArea = () => {
    const [P0, P1, P2] = this.state.points
    const P3 = this.calculateLastPoint()
    const base = this.distanceBetweenPoints(P0, P1)
    const height = this.distanceBetweenPointAndLine(P0, P2, P3)
    return base * height
  }

  drawParallelogram = () => {
    this.changeColor(BLUE)
    const P3 = this.calculateLastPoint()
    const parallelogramsVerts = [...this.state.points, P3]
    addIndex(forEach)(({ x, y }, i) => {
      const { x: fromX, y: fromY } = parallelogramsVerts[(i + 1) % 4]
      this.draw(() => {
        this.ctx.moveTo(fromX, fromY)
        this.ctx.lineTo(x, y)
      })
    })(parallelogramsVerts)
    return {
      center: this.calculateCenter(),
      area: this.calculateArea(),
    }
  }

  render() {
    return (
      <canvas width="800" height="400" ref={this.canvas} onMouseDown={this.updateReferences}>
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    )
  }
}

export default Canvas
