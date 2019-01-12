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
      updated = f.decrementGroupInitiativeOrder(payload, state)
      return updated
    case c.INCREMENT_GROUP_INITIATIVE_ORDER:
      updated = f.incrementGroupInitiativeOrder(payload, state)
      return updated
    case c.REMOVE_CREATURE_FROM_STATE:
      updated = [...state.filter(creature => creature.id !== payload.creature.id)]
      return updated
    case c.ROLL_INITIATIVE:
      updated = f.createLairActions(state)
      updated = f.rollInitiative(updated)
      updated = f.sortCreaturesArray(updated)
      return updated
    default:
      return state
  }
}
