import { UPDATE_CANVAS } from './types'

const updateCanvas = updatedState => ({
  type: UPDATE_CANVAS,
  ...updatedState,
})

export default updateCanvas
