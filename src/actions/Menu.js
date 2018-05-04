import { UPDATE_MENU } from './types'

const updateMenu = updatedState => ({
  type: UPDATE_MENU,
  ...updatedState,
})

export default updateMenu
