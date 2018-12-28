import * as c from '../constants/index'

export const addCreatures = creatures => ({ type: c.ADD_CREATURES, creatures })

export const decrementCreatureInitiative = id => ({ type: c.DECREMENT_CREATURE_INITIATIVE, id })
export const incrementCreatureInitiative = id => ({ type: c.INCREMENT_CREATURE_INITIATIVE, id })

export const removeCreature = creature => ({ type: c.REMOVE_CREATURE, creature })

export const rollInitiative = () => ({ type: c.ROLL_INITIATIVE })

export const setStateFromLocal = localCreatures => ({
  type: c.SET_STATE_FROM_LOCAL,
  localCreatures,
})
