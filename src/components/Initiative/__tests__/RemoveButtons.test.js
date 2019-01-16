import React from 'react'
import RemoveButtons from '../RemoveButtons'
import { shallow } from 'enzyme'

describe('`RemoveButtons` component', () => {
  it('should render without crashing', () => {
    const props = {
      creatures: [
        {
          name: 'A',
          modifier: 0,
          advantage: false,
          ac: 10,
          hp: 20,
          xp: 200,
          id: '200',
          groupID: '101',
        },
      ],
      removeCreature: jest.fn(),
      removeLocal: jest.fn(),
    }
    const removeButtons = shallow(<RemoveButtons {...props} />)
    expect(removeButtons).toHaveLength(1)
  })
})
