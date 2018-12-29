// Experience Reducer
import * as c from '../constants'

const defaultState = {
  monsterCount: 0,
  playerCount: 0,
  totalXP: 0,
  xpPerPlayer: 0,
}

export default (state = defaultState, payload) => {
  let monsterCount = 0,
    playerCount = 0,
    totalXP = 0,
    xpPerPlayer = 0
  switch (payload.type) {
    case c.ADD_CREATURES:
      monsterCount =
        payload.creatures.filter(c => c.id.split('-')[0] === 'monster').length + state.monsterCount

      playerCount =
        payload.creatures.filter(c => c.id.split('-')[0] === 'player').length + state.playerCount

      totalXP =
        payload.creatures
          .filter(c => c.id.split('-')[0] === 'monster')
          .reduce((acc, curr) => acc + curr.xp, 0) + state.totalXP

      xpPerPlayer = playerCount > 0 ? totalXP / playerCount : 0

      return Object.assign({}, state, { monsterCount, playerCount, totalXP, xpPerPlayer })
    case c.REMOVE_CREATURE:
      const type = payload.creature.id.split('-')[0]
      monsterCount = type === 'monster' ? state.monsterCount - 1 : state.monsterCount
      playerCount = type === 'player' ? state.playerCount - 1 : state.playerCount

      if (type === 'monster' && monsterCount > 0) {
        totalXP = state.totalXP - payload.creature.xp
      } else if (monsterCount === 0) {
        totalXP = 0
      } else {
        totalXP = state.totalXP
      }

      xpPerPlayer = playerCount > 0 ? totalXP / playerCount : 0

      return Object.assign({}, state, { monsterCount, playerCount, totalXP, xpPerPlayer })
    case c.SET_STATE_FROM_LOCAL:
      monsterCount =
        payload.localCreatures.filter(c => c.id.split('-')[0] === 'monster').length +
        state.monsterCount

      playerCount =
        payload.localCreatures.filter(c => c.id.split('-')[0] === 'player').length +
        state.playerCount

      totalXP =
        payload.localCreatures
          .filter(c => c.id.split('-')[0] === 'monster')
          .reduce((acc, curr) => acc + curr.xp, 0) + state.totalXP

      xpPerPlayer = playerCount > 0 ? totalXP / playerCount : 0

      return Object.assign({}, state, { monsterCount, playerCount, totalXP, xpPerPlayer })
    default:
      return state
  }
}
