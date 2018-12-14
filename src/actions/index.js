// Creature Actions
import * as c from '../constants/index'

export const addCreature = creature => {
  return {
    type: c.ADD_CREATURE,
    creature,
  }
}

export const removeCreature = id => {
  return {
    type: c.REMOVE_CREATURE,
    id,
  }
}

export const setStateFromLocal = localCreatures => {
  return {
    type: c.SET_STATE_FROM_LOCAL,
    localCreatures,
  }
}
