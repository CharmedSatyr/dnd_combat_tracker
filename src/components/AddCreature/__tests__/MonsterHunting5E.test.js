import React from 'react'
import MonsterHunting5E from '../MonsterHunting5E'
import { shallow } from 'enzyme'

describe('`MonsterHunting5E` component', () => {
  it('should render without crashing', () => {
    const props = {
      addCreatures: jest.fn(),
    }
    const monsterHunting5E = shallow(<MonsterHunting5E {...props} />)
    expect(monsterHunting5E).toHaveLength(1)
  })
})
