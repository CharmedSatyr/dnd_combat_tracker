import React from 'react'
import PlayerListGroupItem from '../PlayerListGroupItem'
import { shallow } from 'enzyme'

describe('`PlayerListGroupItem` component', () => {
  it('should render without crashing', () => {
    const props = {
      player: {
        name: 'A',
        modifier: 0,
        advantage: false,
        ac: 10,
        hp: 20,
        xp: 200,
        id: '100',
        groupID: '10202',
      },
      removeCreature: jest.fn(),
    }
    const playerListGroupItem = shallow(<PlayerListGroupItem {...props} />)
    expect(playerListGroupItem).toHaveLength(1)
  })
})
