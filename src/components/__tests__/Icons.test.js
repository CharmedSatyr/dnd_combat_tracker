import React from 'react'
import { shallow } from 'enzyme'
import { RemoveIcon } from '../Icons'

describe('`RemoveIcon` component', () => {
  it('should render without crashing', () => {
    const props = {
      creature: {
        name: 'a',
        modifier: 1,
        advantage: false,
        id: 100,
        groupID: 300,
      },
      removeCreature: jest.fn(),
    }
    const removeIcon = shallow(<RemoveIcon {...props} />)
    expect(removeIcon).toHaveLength(1)
  })
})
