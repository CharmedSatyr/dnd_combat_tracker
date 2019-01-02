import * as f from '../reducer.functions'

describe('`d20` reducer function', () => {
  it('should return a Number', () => {
    expect(f.d20()).toEqual(expect.any(Number))
  })
  it('should return a number between 1 and 20 inclusive if not given an argument', () => {
    expect(f.d20()).toBeGreaterThanOrEqual(1)
    expect(f.d20()).toBeLessThanOrEqual(20)
  })
  it('should return a number between 1+arg and 20+arg inclusive if given an argument', () => {
    expect(f.d20(100)).toBeGreaterThanOrEqual(101)
    expect(f.d20(100)).toBeLessThanOrEqual(120)
  })
  it('should throw an error if given an argument that cannot be parsed as a number', () => {
    expect(() => f.d20('rice')).toThrow()
  })
})

describe('`d20A` reducer function', () => {
  // Note that these tests do not test anything specific to rolling with advantage!
  it('should return a Number', () => {
    expect(f.d20A()).toEqual(expect.any(Number))
  })
  it('should return a number between 1 and 20 inclusive if not given an argument', () => {
    expect(f.d20A()).toBeGreaterThanOrEqual(1)
    expect(f.d20A()).toBeLessThanOrEqual(20)
  })
  it('should return a number between 1+arg and 20+arg inclusive if given an argument', () => {
    expect(f.d20A(100)).toBeGreaterThanOrEqual(101)
    expect(f.d20A(100)).toBeLessThanOrEqual(120)
  })
})

// orderInitiativeGroups
describe('`orderInitiativeGroups` reducer function', () => {
  it('should return an Array', () => {
    const groupIDs = { a: 23, b: 1, c: 13 }
    expect(Array.isArray(f.orderInitiativeGroups(groupIDs))).toBeTruthy()
  })
  it('should put the argument keys into order based on descending values', () => {
    const groupIDs = { a: 23, b: 1, c: 13 }
    expect(f.orderInitiativeGroups(groupIDs)).toEqual(['a', 'c', 'b'])
  })
})

// isValidInitiativeOrder
describe('`isValidInitiativeOrder` reducer function', () => {
  it('should be Truthy if each initiative order is a duplicate and 0', () => {
    const ordered = [{ order: 0 }, { order: 0 }]
    expect(f.isValidInitiativeOrder(ordered)).toBeTruthy()
  })
  it('should be Truthy if each initiative order is strictly sequential from 0', () => {
    const ordered = [{ order: 0 }, { order: 1 }, { order: 2 }]
    expect(f.isValidInitiativeOrder(ordered)).toBeTruthy()
  })
  it('should be Truthy if sequential initiative order from 0 has duplicates', () => {
    const ordered = [{ order: 0 }, { order: 1 }, { order: 1 }, { order: 2 }]
    expect(f.isValidInitiativeOrder(ordered)).toBeTruthy()
  })
  it('should be Falsy if an array object lacks an order key', () => {
    const disordered = [{}, { order: 0 }, { order: 1 }, { order: 2 }, { order: 3 }]
    expect(f.isValidInitiativeOrder(disordered)).toBeFalsy()
  })
  it("should be Falsy if an array object's order is not a Number", () => {
    const disorderly = [{ order: 'apple' }, { order: 1 }, { order: 2 }, { order: 3 }, { order: 3 }]
    expect(f.isValidInitiativeOrder(disorderly)).toBeFalsy()
  })
  it('should be Falsy if initiative order does not start at 0', () => {
    const disordered = [{ order: 1 }, { order: 1 }, { order: 1 }, { order: 2 }]
    expect(f.isValidInitiativeOrder(disordered)).toBeFalsy()
  })
  it('should be Falsy if initiative order is not sequential', () => {
    const disordered = [{ order: 0 }, { order: 1 }, { order: 3 }, { order: 2 }]
    expect(f.isValidInitiativeOrder(disordered)).toBeFalsy()
  })
  it("should be Falsy if an array object's order is negative", () => {
    const disordered = [{ order: -1 }, { order: 0 }, { order: 1 }, { order: 2 }, { order: 3 }]
    expect(f.isValidInitiativeOrder(disordered)).toBeFalsy()
  })

  it('should be Falsy if initiative order is not sequential, regardless of duplicates', () => {
    const disordered = [{ order: 0 }, { order: 2 }, { order: 1 }, { order: 2 }]
    expect(f.isValidInitiativeOrder(disordered)).toBeFalsy()
  })
})

// findInitiativeOrderLength
describe('`findInitiativeOrderLength` reducer function', () => {
  it('should throw an Error if the argument does not have a valid initiative order', () => {
    const disordered = ['rice']
    expect(() => f.findInitiativeOrderLength(disordered)).toThrow()
  })
  it('should return a number', () => {
    const ordered = [{ order: 0 }, { order: 1 }]
    expect(f.findInitiativeOrderLength(ordered)).toEqual(expect.any(Number))
  })
  it('should return the highest initiative order in the ordered array', () => {
    const ordered = [{ order: 0 }, { order: 1 }, { order: 1 }, { order: 2 }]
    expect(f.findInitiativeOrderLength(ordered)).toBe(2)
  })
})
