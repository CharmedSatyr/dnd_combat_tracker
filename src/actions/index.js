import * as c from '../constants/index'

export const addCreatures = creatures => ({ type: c.ADD_CREATURES_TO_STATE, creatures })

export const decrementGroupInitiativeOrder = groupID => ({
  type: c.DECREMENT_GROUP_INITIATIVE_ORDER,
  groupID,
})

export const incrementGroupInitiativeOrder = groupID => ({
  type: c.INCREMENT_GROUP_INITIATIVE_ORDER,
  groupID,
})

export const removeCreature = creature => ({ type: c.REMOVE_CREATURE_FROM_STATE, creature })

export const rollInitiative = () => ({ type: c.ROLL_INITIATIVE })
