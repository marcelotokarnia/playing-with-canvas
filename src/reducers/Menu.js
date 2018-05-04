import { UPDATE_MENU } from '../actions/types'

const initialState = {
  activeTab: 'details',
}

const Menu = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_MENU: {
    const {
      activeTab,
    } = action
    return {
      activeTab,
    }
  }
  default:
    return state
  }
}

export default Menu
