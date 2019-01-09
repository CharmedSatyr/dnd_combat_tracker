import * as c from '../constants/index'

export const addCreatures = creatures => ({ type: c.ADD_CREATURES_TO_STATE, creatures })

export const decrementCreatureInitiative = id => ({ type: c.DECREMENT_CREATURE_INITIATIVE, id })

export const incrementGroupInitiativeOrder = groupID => ({
  type: c.INCREMENT_GROUP_INITIATIVE_ORDER,
  groupID,
})

export const removeCreature = creature => ({ type: c.REMOVE_CREATURE_FROM_STATE, creature })

export const rollInitiative = () => ({ type: c.ROLL_INITIATIVE })
