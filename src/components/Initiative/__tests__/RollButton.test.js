import React from 'react'
import RollButton from '../RollButton'
import { shallow } from 'enzyme'

describe('`RollButton` component', () => {
  it('should render without crashing', () => {
    const props = {
      rollFunction: jest.fn(),
    }
    const rollButton = shallow(<RollButton {...props} />)
    expect(rollButton).toHaveLength(1)
  })
})
