import React from 'react'
import LairActionListGroupItem from '../LairActionListGroupItem'
import { shallow } from 'enzyme'

describe('`LairActionListGroupItem` component', () => {
  it('should render without crashing', () => {
    const props = {
      monster: {
        groupID: '101',
        id: '102',
        initiative: 20,
        name: 'A',
        modifier: 0,
        order: 1,
        type: 'lair-action',
      },
    }
    const lairActionListGroupItem = shallow(<LairActionListGroupItem monster={props.monster} />)
    expect(lairActionListGroupItem).toHaveLength(1)
  })
})
