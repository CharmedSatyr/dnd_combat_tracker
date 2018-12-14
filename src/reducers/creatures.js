// Creatures
import * as c from '../constants'

export default (state = [], payload) => {
  switch (payload.type) {
    case c.ADD_CREATURE:
      return [...state, payload.creature]
    case c.SET_STATE_FROM_LOCAL:
      return [...payload.localCreatures]
    default:
      return state
  }
}
