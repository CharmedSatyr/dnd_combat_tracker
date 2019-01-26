// Creature Reducer
import * as c from '../constants'
import * as f from './reducer.functions'

export default (state = [], payload) => {
  let updated
  switch (payload.type) {
    case c.ADD_CREATURES_TO_STATE:
      updated = [...state, ...payload.creatures]
      return updated
    case c.DECREMENT_GROUP_INITIATIVE_ORDER:
      updated = f.decrementGroupInitiativeOrder(state, payload)
      return updated
    case c.DAMAGE_CREATURE:
      updated = f.damageCreature(state, payload)
      return updated
    case c.HEAL_CREATURE:
      updated = f.healCreature(state, payload)
      return updated
    case c.INCREMENT_GROUP_INITIATIVE_ORDER:
      updated = f.incrementGroupInitiativeOrder(state, payload)
      return updated
    case c.REMOVE_CREATURE_FROM_STATE:
      updated = [...state.filter(creature => creature.id !== payload.creature.id)]
      if (updated.every(c => c.initiative)) {
        updated = f.updateOrder(updated)
      }
      return updated
    case c.ROLL_INITIATIVE:
      updated = f.createLairActions(state)
      updated = f.rollInitiative(updated)
      updated = f.sortCreaturesArray(updated)
      return updated
    case c.ADD_CUSTOM_CONDITION:
      updated = f.addCustomCondition(state, payload)
      return updated
    case c.REMOVE_CUSTOM_CONDITION:
      updated = f.removeCustomCondition(state, payload)
      return updated
    case c.SET_EXHAUSTION_LEVEL:
      updated = f.setExhaustionLevel(state, payload)
      return updated
    case c.TOGGLE_CONDITION:
      updated = f.toggleCondition(state, payload)
      return updated
    default:
      return state
  }
}
