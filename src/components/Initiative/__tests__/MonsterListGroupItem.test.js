import React from 'react'
import MonsterListGroupItem from '../MonsterListGroupItem'
import { shallow } from 'enzyme'

describe('`MonsterListGroupItem` component', () => {
  it('should render without crashing', () => {
    const props = {
      monster: {
        ac: 10,
        advantage: false,
        groupID: '120',
        hp: 20,
        id: '100',
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
