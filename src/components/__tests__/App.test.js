import React from 'react'
import App from '../App'
import { shallow } from 'enzyme'

import AddCreature from '../AddCreature/'
import Initiative from '../Initiative/'
import Experience from '../Experience/'

describe('`App` component', () => {
  it('should render without crashing', () => {
    const app = shallow(<App />)
    expect(app).toHaveLength(1)
  })
  it('should contain one instance of `AddCreature` component', () => {
    const app = shallow(<App />)
    expect(app.find(AddCreature)).toHaveLength(1)
  })
  it('should contain one instance of `Initiative` component', () => {
    const app = shallow(<App />)
    expect(app.find(Initiative)).toHaveLength(1)
  })
  it('should contain one instance of `Experience` component', () => {
    const app = shallow(<App />)
    expect(app.find(Experience)).toHaveLength(1)
  })
})
