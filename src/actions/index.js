// Creature Actions
import * as c from '../constants/index'

export const addCreatures = creatures => ({
  type: c.ADD_CREATURES,
  creatures,
})

export const removeCreature = id => ({
  type: c.REMOVE_CREATURE,
  id,
})

export const rollInitiative = () => ({
  type: c.ROLL_INITIATIVE,
})

export const setStateFromLocal = localCreatures => ({
  type: c.SET_STATE_FROM_LOCAL,
  localCreatures,
})
