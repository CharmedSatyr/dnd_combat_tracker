// Creature Actions
import * as c from '../constants/index'

export const addCreature = creature => {
  return {
    type: c.ADD_CREATURE,
    creature,
  }
}

export const removeCreature = creature => {
  return {
    type: c.REMOVE_CREATURE,
    id: creature.id,
  }
}

export const setStateFromLocal = localCreatures => {
  return {
    type: c.SET_STATE_FROM_LOCAL,
    localCreatures,
  }
}
