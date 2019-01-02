// Creature Reducer
import * as c from '../constants'
import * as f from './reducer.functions'

export default (state = [], payload) => {
  let updated
  switch (payload.type) {
    case c.ADD_CREATURES_TO_STATE:
      updated = [...state, ...payload.creatures]
      return updated
    case c.INCREMENT_CREATURE_INITIATIVE:
      // Find the index of the id
      const incrementIndex = state.findIndex(c => c.id === payload.id)

      // Copy the state
      updated = [...state]

      // If the objects exist
      if (updated[incrementIndex] && updated[incrementIndex - 1]) {
        // Swap the object at the incrementIndex with the one before it
        ;[updated[incrementIndex], updated[incrementIndex - 1]] = [
          updated[incrementIndex - 1],
          updated[incrementIndex],
        ]

        // Switch the order numbers
        updated[incrementIndex].order = incrementIndex + 1
        updated[incrementIndex - 1].order = incrementIndex
      }
      return updated
    case c.DECREMENT_CREATURE_INITIATIVE:
      // Find the index of the id
      const decrementIndex = state.findIndex(c => c.id === payload.id)

      // Copy the state
      updated = [...state]

      // If the objects exist
      if (updated[decrementIndex] && updated[decrementIndex + 1]) {
        // Swap the object at the decrementIndex with the one before it
        ;[updated[decrementIndex], updated[decrementIndex + 1]] = [
          updated[decrementIndex + 1],
          updated[decrementIndex],
        ]

        // Switch the order numbers
        updated[decrementIndex].order = updated[decrementIndex].order - 1
        updated[decrementIndex + 1].order = updated[decrementIndex + 1].order + 1
      }

      return updated
    case c.REMOVE_CREATURE_FROM_STATE:
      updated = [...state.filter(creature => creature.id !== payload.creature.id)]
      return updated
    case c.ROLL_INITIATIVE:
      updated = f.rollInitiative(state)
      return updated
    default:
      return state
  }
}
