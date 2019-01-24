import React from 'react'
import PlayerListGroupItem from '../PlayerListGroupItem'
import { shallow } from 'enzyme'

describe('`PlayerListGroupItem` component', () => {
  it('should render without crashing', () => {
    const props = {
      player: {
        advantage: false,
        groupID: '10202',
        id: '12',
        modifier: 0,
        name: 'A',
        type: 'player',
      },
      removeCreature: jest.fn(),
    }
    const playerListGroupItem = shallow(<PlayerListGroupItem {...props} />)
    expect(playerListGroupItem).toHaveLength(1)
  })
})
