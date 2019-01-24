import experience, { initialState } from '../experience'
import * as c from '../../constants/'

describe('`experience` reducer', () => {
  it('should have a default state with `monsterCount`, `playerCount, `, `totalXP`, and `xpPerPlayer` properties', () => {
    const action = { type: null }
    expect(experience(undefined, action)).toHaveProperty('monsterCount')
    expect(experience(undefined, action)).toHaveProperty('playerCount')
    expect(experience(undefined, action)).toHaveProperty('totalXP')
    expect(experience(undefined, action)).toHaveProperty('xpPerPlayer')
  })
  it('should have default properties of the appropriate types', () => {
    const action = { type: null }
    expect(experience(undefined, action)).toMatchObject({
      monsterCount: expect.any(Number),
      playerCount: expect.any(Number),
      totalXP: expect.any(Number),
      xpPerPlayer: expect.any(Number),
    })
  })

  /* ADD_CREATURES_TO_STATE */
  const addAction = {
    creatures: [
      { id: 'player-100', type: 'player' },
      { id: 'player-200', type: 'player' },
      { id: 'monster-100', type: 'monster', xp: 100 },
    ],
    type: c.ADD_CREATURES_TO_STATE,
  }

  it('should increment `playerCount` by the number of players added when `ADD_CREATURES_TO_STATE` is received', () => {
    const updatedState = { playerCount: initialState.playerCount + 2 }
    expect(experience(initialState, addAction)).toEqual(expect.objectContaining(updatedState))
  })
  it('should increment `monsterCount` by the number of monsters added when `ADD_CREATURES_TO_STATE` is received', () => {
    const updatedState = { monsterCount: initialState.monsterCount + 1 }
    expect(experience(initialState, addAction)).toEqual(expect.objectContaining(updatedState))
  })
  it("should increment `totalXP` by the total amount of added monsters' `xp` when `ADD_CREATURES_TO_STATE` is received", () => {
    const updatedState = { totalXP: 100 }
    expect(experience(initialState, addAction)).toEqual(expect.objectContaining(updatedState))
  })
  it('should update `xpPerPlayer` to the ratio of total xp to players when `ADD_CREATURES_TO_STATE` is received', () => {
    const updatedState = { xpPerPlayer: 50 }
    expect(experience(initialState, addAction)).toEqual(expect.objectContaining(updatedState))
  })
  it('should round `xpPerPlayer` down to the nearest integer when `ADD_CREATURES_TO_STATE` is received', () => {
    const addAction = {
      creatures: [
        { id: 'player-100', type: 'player' },
        { id: 'player-200', type: 'player' },
        { id: 'monster-100', type: 'monster', xp: 7 },
      ],
      type: c.ADD_CREATURES_TO_STATE,
    }
    const updatedState = { xpPerPlayer: 3 }
    expect(experience(initialState, addAction)).toEqual(expect.objectContaining(updatedState))
  })

  /* REMOVE_CREATURE_FROM_STATE */
  const removePlayerAction = {
    creature: { id: 'player-100', type: 'player' },
    type: c.REMOVE_CREATURE_FROM_STATE,
  }
  const removeMonsterAction = {
    creature: { id: 'monster-100', type: 'monster', xp: 100 },
    type: c.REMOVE_CREATURE_FROM_STATE,
  }

  const usedState = { monsterCount: 1, playerCount: 2, totalXP: 100, xpPerPlayer: 50 }
  it('should decrement `playerCount` by 1 when `REMOVE_CREATURE_FROM_STATE` is received', () => {
    const updatedState = { playerCount: usedState.playerCount - 1 }
    expect(experience(usedState, removePlayerAction)).toEqual(expect.objectContaining(updatedState))
  })
  it('should decrement `monsterCount` by 1 when `REMOVE_CREATURE_FROM_STATE` is received', () => {
    const updatedState = { monsterCount: usedState.monsterCount - 1 }
    expect(experience(usedState, removeMonsterAction)).toEqual(
      expect.objectContaining(updatedState)
    )
  })
  it("should decrement `totalXP` by the removed monster's `xp` when `REMOVE_CREATURE_FROM_STATE` is received", () => {
    const updatedState = { totalXP: 0 }
    expect(experience(usedState, removeMonsterAction)).toEqual(
      expect.objectContaining(updatedState)
    )
  })
  it('should update `xpPerPlayer` to the ratio of total xp to players when `REMOVE_CREATURE_FROM_STATE` is received', () => {
    const updatedState = { xpPerPlayer: 0 }
    expect(experience(usedState, removeMonsterAction)).toEqual(
      expect.objectContaining(updatedState)
    )
  })
  it('should display 0 `xpPerPlayer` and `totalXP` if `monsterCount` is 0 when `REMOVE_CREATURE_FROM_STATE` is received', () => {
    const updatedState = { monsterCount: 0, xpPerPlayer: 0, totalXP: 0 }
    expect(experience(usedState, removeMonsterAction)).toEqual(
      expect.objectContaining(updatedState)
    )
  })
  it('should round `xpPerPlayer` down to the nearest integer when `REMOVE_CREATURE_FROM_STATE` is received', () => {
    const usedState = { monsterCount: 2, playerCount: 2, totalXP: 14, xpPerPlayer: 7 }
    const removeAction = {
      creature: { id: 'monster-100', type: 'monster', xp: 7 },
      type: c.REMOVE_CREATURE_FROM_STATE,
    }
    const updatedState = { xpPerPlayer: 3 }
    expect(experience(usedState, removeAction)).toEqual(expect.objectContaining(updatedState))
  })
})
