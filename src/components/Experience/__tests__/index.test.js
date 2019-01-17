import React from 'react'
import Experience from '../index'
import { shallow } from 'enzyme'

describe('`Experience` component', () => {
  it('should render without crashing', () => {
    const props = { playerCount: 2, totalXP: 10, xpPerPlayer: 12 }
    const experience = shallow(<Experience {...props} />)
    expect(experience).toHaveLength(1)
  })
})
