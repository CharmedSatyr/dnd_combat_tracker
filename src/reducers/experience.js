// Experience Reducer
import * as c from '../constants'

export const initialState = {
  monsterCount: 0,
  playerCount: 0,
  totalXP: 0,
  xpPerPlayer: 0,
}

export default (state = initialState, payload) => {
  let monsterCount = 0,
    playerCount = 0,
    totalXP = 0,
    xpPerPlayer = 0
  switch (payload.type) {
    case c.ADD_CREATURES_TO_STATE:
      payload.creatures.forEach(c => {
        if (c.type === 'monster') {
          monsterCount++
          totalXP += c.xp
        }
        if (c.type === 'player') {
          playerCount++
        }
      })
      monsterCount += state.monsterCount
      totalXP += state.totalXP
      playerCount += state.playerCount

      xpPerPlayer = playerCount > 0 ? Math.floor(totalXP / playerCount) : 0

      return Object.assign({}, state, { monsterCount, playerCount, totalXP, xpPerPlayer })
    case c.REMOVE_CREATURE_FROM_STATE:
      const { type } = payload.creature
      monsterCount = type === 'monster' ? state.monsterCount - 1 : state.monsterCount
      playerCount = type === 'player' ? state.playerCount - 1 : state.playerCount

      if (type === 'monster' && monsterCount > 0) {
        totalXP = state.totalXP - payload.creature.xp
      } else if (monsterCount === 0) {
        totalXP = 0
      } else {
        totalXP = state.totalXP
      }

      xpPerPlayer = playerCount > 0 ? Math.floor(totalXP / playerCount) : 0

      return Object.assign({}, state, { monsterCount, playerCount, totalXP, xpPerPlayer })
    default:
      return state
  }
}
