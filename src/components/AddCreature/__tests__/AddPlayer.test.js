import React from 'react'
import AddPlayer from '../AddPlayer'
import { shallow } from 'enzyme'

describe('`AddPlayer` component', () => {
  it('should render without crashing', () => {
    const props = {
      addCreatures: jest.fn(),
    }
    const addPlayer = shallow(<AddPlayer {...props} />)
    expect(addPlayer).toHaveLength(1)
  })
})
