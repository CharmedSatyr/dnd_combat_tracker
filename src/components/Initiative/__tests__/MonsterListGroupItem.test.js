import React from 'react'
import MonsterListGroupItem from '../MonsterListGroupItem'
import { shallow } from 'enzyme'

describe('`MonsterListGroupItem` component', () => {
  it('should render without crashing', () => {
    const props = {
      monster: {
        name: 'A',
        modifier: 0,
        advantage: false,
        ac: 10,
        hp: 20,
        xp: 200,
        id: '100',
        groupID: '120',
      },
      removeCreature: jest.fn(),
    }
    const monsterListGroupItem = shallow(<MonsterListGroupItem {...props} />)
    expect(monsterListGroupItem).toHaveLength(1)
  })
})
