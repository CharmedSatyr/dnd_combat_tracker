import React from 'react'
import IncrementDecrementButtons from '../IncrementDecrementButtons'
import { shallow } from 'enzyme'

describe('`IncrementDecrementButtons` component', () => {
  it('should render without crashing', () => {
    const props = {
      decrementGroupInitiativeOrder: jest.fn(),
      groupID: '0010120304',
      incrementGroupInitiativeOrder: jest.fn(),
    }
    const incrementDecrementButtons = shallow(<IncrementDecrementButtons {...props} />)
    expect(incrementDecrementButtons).toHaveLength(1)
  })
})
