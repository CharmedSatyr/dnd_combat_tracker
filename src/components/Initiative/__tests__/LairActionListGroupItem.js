import React from 'react'
import AddOnListGroupItem from '../AddOnListGroupItem'
import { shallow } from 'enzyme'

describe('`AddOnListGroupItem` component', () => {
  it('should render without crashing', () => {
    const props = {
      monster: {
        name: 'A',
        modifier: 0,
        advantage: false,
        ac: 10,
        hp: 20,
        xp: 200,
        id: '102',
        groupID: '101',
        initiative: 20,
        order: 1,
      },
    }
    const addOnListGroupItem = shallow(<AddOnListGroupItem monster={props.monster} />)
    expect(addOnListGroupItem).toHaveLength(1)
  })
})
