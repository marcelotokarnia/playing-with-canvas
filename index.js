const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")
const points = Array(3)
let reference = 0
const RED = '#FF0000'
const BLUE = '#0000FF'
const YELLOW = '#FFFF00'

canvas.addEventListener('mousedown', (e) => {
  updateReferences(e)
  clearCanvas()
  const circles = drawRedCircles()
  if (circles.length > 2) {
    const {center, area} = drawParallelogram()
    drawYellowCircle(center, area)
  }
  console.log(points)
})

const drawYellowCircle = ({x, y}, area) => {
  ctx.strokeStyle = YELLOW
  const R = Math.sqrt(area/Math.PI)
  ctx.beginPath()
  ctx.arc(x, y, R, 0, 2 * Math.PI)
  ctx.stroke()
}

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const updateReferences = e => {
  points[reference % 3] = {x: e.offsetX, y: e.offsetY}
  reference++
}

const drawRedCircles = () => {
  ctx.strokeStyle = RED
  const circles = points.filter(point => !!point)
  circles.forEach(({x, y}) => {
    ctx.beginPath()
    ctx.arc(x, y, 11, 0, 2 * Math.PI)
    ctx.stroke()
  })
  return circles
}

const calculateLastPoint = () => ({
  x: points[0].x + (points[2].x - points[1].x),
  y: points[0].y + (points[2].y - points[1].y)
})

const calculateCenter = () => ({
  x: points[0].x + (points[2].x - points[0].x)/2,
  y: points[0].y + (points[2].y - points[0].y)/2,
})

const distanceBetweenPoints = (P0, P1) => Math.sqrt(
  Math.pow(P0.x - P1.x, 2) + Math.pow(P0.y - P1.y, 2)
)

const distanceBetweenPointAndLine = (P0, L1, L2) => Math.abs(
  ((L2.y - L1.y) * P0.x) - ((L2.x - L1.x) * P0.y) + (L2.x * L1.y) - (L2.y * L1.x)
)/distanceBetweenPoints(L1, L2)

const calculateArea = () => {
  const base = distanceBetweenPoints(points[0], points[1])
  const height = distanceBetweenPointAndLine(points[0], points[2], calculateLastPoint())
  return base * height
}

const drawParallelogram = () => {
  ctx.strokeStyle = BLUE;
  [points[0], points[1], points[2], calculateLastPoint()].forEach(({x,y}, i, arr) => {
    ctx.beginPath()
    const {x: from_x, y: from_y} = arr[(i + 1) % 4]
    ctx.moveTo(from_x, from_y)
    ctx.lineTo(x, y)
    ctx.stroke()
  })
  return {
    center: calculateCenter(),
    area: calculateArea()
  }
}