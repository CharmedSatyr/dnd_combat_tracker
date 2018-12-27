// Experience Reducer
import * as c from '../constants'

const defaultState = {
  playerCount: 0,
  totalXP: 0,
  xpPerPlayer: 0,
}

export default (state = defaultState, payload) => {
  switch (payload.type) {
    case c.ADD_CREATURES:
      const playerCount =
        payload.creatures.filter(c => c.id.split('-')[0] === 'player').length + state.playerCount
      const totalXP =
        payload.creatures
          .filter(c => c.id.split('-')[0] === 'monster')
          .reduce((acc, curr) => acc + curr.xp, 0) + state.totalXP
      const xpPerPlayer = playerCount > 0 ? totalXP / playerCount : 0

      return Object.assign({}, state, { playerCount, totalXP, xpPerPlayer })
    case c.REMOVE_CREATURE:
      return state
    case c.SET_STATE_FROM_LOCAL:
      return state
    default:
      return state
  }
}
