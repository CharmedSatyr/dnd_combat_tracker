import React from 'react'
import AddMonster from '../AddMonster'
import { shallow } from 'enzyme'

describe('`AddMonster` component', () => {
  it('should render without crashing', () => {
    const props = {
      addCreatures: jest.fn(),
    }
    const addMonster = shallow(<AddMonster {...props} />)
    expect(addMonster).toHaveLength(1)
  })
})
