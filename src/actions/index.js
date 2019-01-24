import * as c from '../constants/index'

export const addCreatures = creatures => ({ creatures, type: c.ADD_CREATURES_TO_STATE })

export const decrementGroupInitiativeOrder = groupID => ({
  groupID,
  type: c.DECREMENT_GROUP_INITIATIVE_ORDER,
})

export const incrementGroupInitiativeOrder = groupID => ({
  groupID,
  type: c.INCREMENT_GROUP_INITIATIVE_ORDER,
})

export const removeCreature = creature => ({ creature, type: c.REMOVE_CREATURE_FROM_STATE })

export const rollInitiative = () => ({ type: c.ROLL_INITIATIVE })
