// Creature Actions
import * as c from '../constants/index'

export const addCreature = creature => ({ type: c.ADD_CREATURE, creature })

export const addMonsters = monsters => ({
  type: c.ADD_MONSTERS,
  monsters,
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
