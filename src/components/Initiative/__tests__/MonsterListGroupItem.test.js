import React from 'react'
import MonsterListGroupItem from '../MonsterListGroupItem'
import { shallow } from 'enzyme'

describe('`MonsterListGroupItem` component', () => {
  it('should render without crashing', () => {
    const props = {
      monster: {
        ac: 10,
        advantage: false,
        conditions: {
          blinded: false,
          charmed: false,
          concentrating: false,
          custom: [],
          deafened: false,
          exhaustion: {
            level: 0,
          },
          frightened: false,
          grappled: false,
          incapacitated: false,
          invisible: false,
          paralyzed: false,
          petrified: false,
          poisoned: false,
          prone: false,
          restrained: false,
          stunned: false,
          unconscious: false,
        },
        groupID: 120,
        hp: {
          current: 20,
          max: 25,
        },
        id: 100,
        modifier: 0,
        name: 'A',
        type: 'monster',
        xp: 200,
      },
      removeCreature: jest.fn(),
    }
    const monsterListGroupItem = shallow(<MonsterListGroupItem {...props} />)
    expect(monsterListGroupItem).toHaveLength(1)
  })
})
