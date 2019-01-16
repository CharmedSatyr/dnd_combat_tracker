import React from 'react'
import AddCreature from '../index'
import { shallow } from 'enzyme'

describe('`AddCreature` component', () => {
  it('should render without crashing', () => {
    const props = {
      addCreatures: jest.fn(),
    }
    const addCreature = shallow(<AddCreature {...props} />)
    expect(addCreature).toHaveLength(1)
  })
})
