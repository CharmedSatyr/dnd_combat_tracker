// Creatures
import * as c from '../constants'

export default (state = [], payload) => {
  let updated
  switch (payload.type) {
    case c.ADD_CREATURE:
      return [...state, payload.creature]
    case c.REMOVE_CREATURE:
      updated = [...state.filter(creature => creature.id !== payload.id)]
      return updated
    case c.ROLL_INITIATIVE:
      const roll = creatures => {
        const d20 = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
        const initiativeOrder = creatures
          .map(c => {
            const min = 1 + parseInt(c.modifier)
            const max = 20 + parseInt(c.modifier)
            const roll1 = d20(min, max)
            const roll2 = d20(min, max)
            const higher = roll1 >= roll2 ? roll1 : roll2
            return { ...c, initiative: c.advantage ? higher : roll1 }
          })
          .sort((a, b) => b.initiative - a.initiative)
        return initiativeOrder
      }
      updated = [...roll(state)]
      return updated
    case c.SET_STATE_FROM_LOCAL:
      return [...payload.localCreatures]
    default:
      return state
  }
}
