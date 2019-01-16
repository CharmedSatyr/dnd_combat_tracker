import React from 'react'
import Initiative from '../index'
import { shallow } from 'enzyme'

describe('`Initiative` component', () => {
  it('should render without crashing', () => {
    const props = {
      addCreatures: jest.fn(),
      creatures: [
        {
          name: 'A',
          modifier: 0,
          advantage: false,
          ac: 10,
          hp: 20,
          xp: 200,
        },
      ],
      removeCreature: jest.fn(),
      rollInitiative: jest.fn(),
    }
    const initiative = shallow(<Initiative {...props} />)
    expect(initiative).toHaveLength(1)
  })
})
