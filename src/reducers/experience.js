// Experience Reducer
import * as c from '../constants'

const defaultState = {
  playerCount: 0,
  totalXP: 0,
  xpPerPlayer: 0,
}

export default (state = defaultState, payload) => {
  let playerCount, totalXP, xpPerPlayer
  switch (payload.type) {
    case c.ADD_CREATURES:
      playerCount =
        payload.creatures.filter(c => c.id.split('-')[0] === 'player').length + state.playerCount
      totalXP =
        payload.creatures
          .filter(c => c.id.split('-')[0] === 'monster')
          .reduce((acc, curr) => acc + curr.xp, 0) + state.totalXP
      xpPerPlayer = playerCount > 0 ? totalXP / playerCount : 0

      return Object.assign({}, state, { playerCount, totalXP, xpPerPlayer })
    case c.REMOVE_CREATURE:
      const type = payload.creature.id.split('-')[0]
      playerCount = type === 'player' ? state.playerCount - 1 : state.playerCount
      totalXP = type === 'monster' ? state.totalXP - payload.creature.xp : state.totalXP
      xpPerPlayer = playerCount > 0 ? totalXP / playerCount : 0

      return Object.assign({}, state, { playerCount, totalXP, xpPerPlayer })
    case c.SET_STATE_FROM_LOCAL:
      playerCount =
        payload.localCreatures.filter(c => c.id.split('-')[0] === 'player').length +
        state.playerCount
      totalXP =
        payload.localCreatures
          .filter(c => c.id.split('-')[0] === 'monster')
          .reduce((acc, curr) => acc + curr.xp, 0) + state.totalXP
      xpPerPlayer = playerCount > 0 ? totalXP / playerCount : 0

      return Object.assign({}, state, { playerCount, totalXP, xpPerPlayer })
    default:
      return state
  }
}
