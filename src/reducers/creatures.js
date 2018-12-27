// Creature Reducer
import * as c from '../constants'

export default (state = [], payload) => {
  let updated
  switch (payload.type) {
    case c.ADD_CREATURES:
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
    case c.REMOVE_CREATURE:
      updated = [...state.filter(creature => creature.id !== payload.id)]
      return updated
    case c.ROLL_INITIATIVE:
      const d20 = modifier => {
        const min = 1 + parseInt(modifier)
        const max = 20 + parseInt(modifier)
        return Math.floor(Math.random() * (max - (min + 1)) + min)
      }

      const d20A = modifier => {
        const roll1 = d20(modifier)
        const roll2 = d20(modifier)
        return roll1 >= roll2 ? roll1 : roll2
      }

      const roll = creaturesArray => {
        let creatures = [...creaturesArray]
        const groupIDs = {}
        // Loop through creatures once
        creatures.forEach(cr => {
          // If it has a group
          if (cr.groupID) {
            // check groupIDs obj for group's initiative
            if (groupIDs.hasOwnProperty(cr.groupID) && groupIDs[cr.groupID]) {
              cr.initiative = groupIDs[cr.groupID]
              // otherwise roll for initiative!
              // with advantage
            } else if (cr.advantage) {
              groupIDs[cr.groupID] = d20A(cr.modifier)
              cr.initiative = groupIDs[cr.groupID]
              // or without advantage
            } else {
              groupIDs[cr.groupID] = d20(cr.modifier)
              cr.initiative = groupIDs[cr.groupID]
            }
            // If the creature has no group, use its id
          } else if (cr.id) {
            // only the number part
            const shortID = cr.id.split('-')[1]
            // If it has advantage, roll w/
            if (cr.advantage) {
              groupIDs[shortID] = d20A(cr.modifier)
              cr.initiative = groupIDs[shortID]
              // if it doesn't, don't
            } else {
              groupIDs[shortID] = d20(cr.modifier)
              cr.initiative = groupIDs[shortID]
            }
          }
        })

        // Get an array of all the Group or Player IDs in initiative order
        const initiativeOrder = []
          .concat(...Object.entries(groupIDs).sort((a, b) => b[1] - a[1]))
          .filter(o => typeof o === 'string')

        // Give each creature object an order property based on that
        creatures.forEach(
          cr =>
            (cr.order = initiativeOrder.indexOf(cr.groupID ? cr.groupID : cr.id.split('-')[1]) + 1)
        )
        // Sort creatures
        return creatures
          .sort((a, b) => (a.name > b.name ? -1 : 1)) // by name
          .sort((a, b) => a.number && b.number && a.number - b.number) // by tag number
          .sort((a, b) => (b.advantage ? 1 : -1)) // by advantage
          .sort((a, b) => b.modifier - a.modifier) // by modifier
          .sort((a, b) => a.order - b.order) // by order
      }
      updated = roll(state)
      return updated
    case c.SET_STATE_FROM_LOCAL:
      updated = [...payload.localCreatures]
      return updated
    default:
      return state
  }
}
