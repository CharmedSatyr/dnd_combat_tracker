// Creature Reducer
import * as c from '../constants'

export default (state = [], payload) => {
  let updated
  switch (payload.type) {
    case c.ADD_CREATURE:
      return [...state, payload.creature]
    case c.ADD_MONSTERS:
      return [...state, ...payload.monsters]
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

      const roll = state => {
        let creatures = [...state]
        const tags = {}
        // Loop through creatures once
        creatures.forEach(cr => {
          // If it has a group
          if (cr.tag) {
            // check tags obj for group's initiative
            if (tags.hasOwnProperty(cr.tag) && tags[cr.tag]) {
              cr.initiative = tags[cr.tag]
              // otherwise roll it!
              // with advantage
            } else if (cr.advantage) {
              tags[cr.tag] = d20A(cr.modifier)
              cr.initiative = tags[cr.tag]
              // or without advantage
            } else {
              tags[cr.tag] = d20(cr.modifier)
              cr.initiative = tags[cr.tag]
            }
            // If no group, if it has advantage, roll w/
          } else if (cr.advantage) {
            cr.initiative = d20A(cr.modifier)
            // if it doesn't, don't
          } else {
            cr.initiative = d20(cr.modifier)
          }
        })
        return creatures
      }
      updated = roll(state)
      return updated
    case c.SET_STATE_FROM_LOCAL:
      return [...payload.localCreatures]
    default:
      return state
  }
}
