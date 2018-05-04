import { UPDATE_CANVAS } from '../actions/types'

const initialState = {
  points: Array(3),
  reference: 0,
  center: null,
  P3: null,
  area: null,
}

const Canvas = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_CANVAS: {
    const {
      points, reference, center, P3, area,
    } = action
    return {
      points,
      reference,
      center,
      P3,
      area,
    }
  }
  default:
    return state
  }
}

export default Canvas
