import * as c from '../constants/index'

export const addCreatures = creatures => ({ type: c.ADD_CREATURES, creatures })

export const decrementCreatureInitiative = id => ({ type: c.DECREMENT_CREATURE_INITIATIVE, id })
export const incrementCreatureInitiative = id => ({ type: c.INCREMENT_CREATURE_INITIATIVE, id })

// Player Count
export const incrementPlayerCount = number => ({ type: c.INCREMENT_PLAYER_COUNT, number })
export const decrementPlayerCount = number => ({ type: c.DECREMENT_PLAYER_COUNT, number })

export const removeCreature = id => ({ type: c.REMOVE_CREATURE, id })

export const rollInitiative = () => ({ type: c.ROLL_INITIATIVE })

export const setStateFromLocal = localCreatures => ({
  type: c.SET_STATE_FROM_LOCAL,
  localCreatures,
})
