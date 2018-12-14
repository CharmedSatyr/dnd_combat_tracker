// Creatures
import * as c from '../constants'

export default (state = [], payload) => {
  switch (payload.type) {
    case c.ADD_CREATURE:
      return [...state, payload.creature]
    case c.REMOVE_CREATURE:
      const updated = state.filter(creature => creature.id === payload.id)
      console.log('bye')
      return [...updated]
    case c.SET_STATE_FROM_LOCAL:
      return [...payload.localCreatures]
    default:
      return state
  }
}
