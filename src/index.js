import { cond, equals, forEach, reject, isNil, addIndex } from 'ramda'
import './css/style.css'

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const points = Array(3)
let reference = 0
const RED = '#FF0000'
const BLUE = '#0000FF'
const YELLOW = '#FFFF00'

const draw = (fn) => {
  ctx.beginPath()
  fn()
  ctx.stroke()
}

const changeColor = color => ctx.strokeStyle = color

const drawYellowCircle = ({ x, y }, area) => {
  changeColor(YELLOW)
  const R = Math.sqrt(area / Math.PI)
  draw(() => ctx.arc(x, y, R, 0, 2 * Math.PI))
}

const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

const updateReferences = e => points[reference++ % 3] = { x: e.offsetX, y: e.offsetY }

const drawRedCircles = () => {
  changeColor(RED)
  const circles = reject(isNil, points)
  forEach(({ x, y }) => {
    draw(() => ctx.arc(x, y, 11, 0, 2 * Math.PI))
  })(circles)
  return circles
}

const calculateLastPoint = () => {
  const [{ x: x0, y: y0 }, { x: x1, y: y1 }, { x: x2, y: y2 }] = points
  return {
    x: x0 + (x2 - x1),
    y: y0 + (y2 - y1),
  }
}

const calculateCenter = () => {
  const [{ x: x0, y: y0 },, { x: x2, y: y2 }] = points
  return {
    x: x0 + (x2 - x0) / 2,
    y: y0 + (y2 - y0) / 2,
  }
}

const distanceBetweenPoints = (P0, P1) => Math.sqrt(
  (P0.x - P1.x) ** 2 + (P0.y - P1.y) ** 2,
)

const distanceBetweenPointAndLine = (P0, L1, L2) => Math.abs(
  ((L2.y - L1.y) * P0.x) - ((L2.x - L1.x) * P0.y) + (L2.x * L1.y) - (L2.y * L1.x),
) / distanceBetweenPoints(L1, L2)

const calculateArea = () => {
  const base = distanceBetweenPoints(points[0], points[1])
  const height = distanceBetweenPointAndLine(points[0], points[2], calculateLastPoint())
  return base * height
}

const drawParallelogram = () => {
  changeColor(BLUE)
  const parallelogramsVerts = [...points, calculateLastPoint()]
  addIndex(forEach)(({ x, y }, i) => {
    const { x: fromX, y: fromY } = parallelogramsVerts[(i + 1) % 4]
    draw(() => {
      ctx.moveTo(fromX, fromY)
      ctx.lineTo(x, y)
    })
  })(parallelogramsVerts)
  return {
    center: calculateCenter(),
    area: calculateArea(),
  }
}

canvas.addEventListener('mousedown', (e) => {
  updateReferences(e)
  clearCanvas()
  const circles = drawRedCircles()
  cond([
    [
      equals(3),
      () => {
        const { center, area } = drawParallelogram()
        drawYellowCircle(center, area)
      },
    ],
  ])(circles.length)
})
