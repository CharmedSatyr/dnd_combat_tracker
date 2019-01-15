import * as f from '../component.functions'

describe('`setID` component function', () => {
  it('should return a string', () => {
    expect(typeof f.setID()).toBe('string')
  })
  it('should return a random string', () => {
    expect(f.setID()).not.toBe(f.setID())
  })
})

describe('`setLabel` component function', () => {
  it('should return a string', () => {
    expect(typeof f.setLabel()).toBe('string')
  })
  it('should return a tag and number if both are defined', () => {
    expect(f.setLabel('Red', 2)).toEqual(expect.stringMatching(/Red 2/))
  })
  it('should return a tag if only a tag is defined', () => {
    expect(f.setLabel('Red')).toEqual(expect.stringMatching(/Red/))
  })
  it('should return a number if only a number is defined', () => {
    expect(f.setLabel(undefined, 2)).toEqual(expect.stringMatching(/2/))
  })
})

describe('`initiativeLength` component function', () => {
  it('should return a string containing its argument', () => {
    expect(f.initiativeLength(2)).toEqual(expect.stringMatching(/\d/))
  })
  it('should return a string with length 2', () => {
    expect(f.initiativeLength(2)).toHaveLength(2)
    expect(f.initiativeLength(20)).toHaveLength(2)
  })
})
