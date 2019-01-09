import * as f from '../reducer.functions'

// sortCreaturesArray
describe('`sortCreaturesArray` reducer function', () => {
  it("should throw an Error if a creature's `name` is not a string", () => {
    const noName = [{ modifier: 0, advantage: false }]
    expect(() => f.sortCreaturesArray(noName)).toThrow()
    const badName = [{ name: true, modifier: 0, advantage: false }]
    expect(() => f.sortCreaturesArray(badName)).toThrow()
  })
  it("should throw an Error if a creature's `modifier` is not a numbr", () => {
    const noMod = [{ name: 'a', advantage: false }]
    expect(() => f.sortCreaturesArray(noMod)).toThrow()
    const badMod = [{ name: 'a', modifier: 'a', advantage: false }]
    expect(() => f.sortCreaturesArray(badMod)).toThrow()
  })
  it("should throw an Error if a creature's `advantage` property is anot a Boolean", () => {
    const noAdv = [{ name: 'a', modifier: 0 }]
    expect(() => f.sortCreaturesArray(noAdv)).toThrow()
    const badAdv = [{ advantage: 'b', name: 'a', modifier: 0 }]
    expect(() => f.sortCreaturesArray(badAdv)).toThrow()
  })

  it('should return an Array', () => {
    const creatures = [{ name: 'a', number: 1, advantage: false, modifier: 2, order: 1 }]
    expect(Array.isArray(f.sortCreaturesArray(creatures))).toBeTruthy()
  })
  it('should sort alphabetically by name, all else being equal', () => {
    const creatures = [
      { name: 'b', tag: undefined, number: undefined, advantage: false, modifier: 2, order: 1 },
      { name: 'a', tag: undefined, number: undefined, advantage: false, modifier: 2, order: 1 },
    ]
    const sorted = [
      { name: 'a', tag: undefined, number: undefined, advantage: false, modifier: 2, order: 1 },
      { name: 'b', tag: undefined, number: undefined, advantage: false, modifier: 2, order: 1 },
    ]
    expect(f.sortCreaturesArray(creatures)).toEqual(sorted)
  })
  it('should sort by number in ascending order, all else being equal', () => {
    const creatures = [
      { name: 'a', tag: undefined, number: 2, advantage: false, modifier: 2, order: 1 },
      { name: 'a', tag: undefined, number: 1, advantage: false, modifier: 2, order: 1 },
    ]
    const sorted = [
      { name: 'a', tag: undefined, number: 1, advantage: false, modifier: 2, order: 1 },
      { name: 'a', tag: undefined, number: 2, advantage: false, modifier: 2, order: 1 },
    ]
    expect(f.sortCreaturesArray(creatures)).toEqual(sorted)
  })
  it('should sort by name, then number [integration test]', () => {
    const creatures = [
      { modifier: 0, name: 'c', number: 2, advantage: false },
      { modifier: 0, name: 'a', number: undefined, advantage: false },
      { modifier: 0, name: 'c', number: 1, advantage: false },
      { modifier: 0, name: 'b', number: undefined, advantage: false },
    ]
    const sorted = [
      { modifier: 0, name: 'c', number: 1, advantage: false },
      { modifier: 0, name: 'c', number: 2, advantage: false },
      { modifier: 0, name: 'a', number: undefined, advantage: false },
      { modifier: 0, name: 'b', number: undefined, advantage: false },
    ]
    expect(f.sortCreaturesArray(creatures)).toEqual(sorted)
  })
  it('should sort alphabetically by tag, all else being equal', () => {
    const creatures = [
      { modifier: 0, name: 'a', tag: 'green', number: undefined, advantage: false },
      { modifier: 0, name: 'a', tag: 'blue', number: undefined, advantage: false },
    ]
    const sorted = [
      { modifier: 0, name: 'a', tag: 'blue', advantage: false },
      { modifier: 0, name: 'a', tag: 'green', advantage: false },
    ]
    expect(f.sortCreaturesArray(creatures)).toEqual(sorted)
  })
  it('should sort creatures with advantage higher, all else being equal', () => {
    const creatures = [
      { modifier: 0, name: 'a', advantage: false },
      { modifier: 0, name: 'a', advantage: true },
    ]
    const sorted = [
      { modifier: 0, name: 'a', advantage: true },
      { modifier: 0, name: 'a', advantage: false },
    ]
    expect(f.sortCreaturesArray(creatures)).toEqual(sorted)
  })
  it('should sort by name, number, tag, then advantage [integration test]', () => {
    const creatures = [
      { advantage: false, modifier: 0, name: 'd', tag: 'blue', number: 2 },
      { advantage: true, modifier: 0, name: 'b', number: 1 },
      { advantage: false, modifier: 0, name: 'a', number: 2 },
      { advantage: true, modifier: 0, name: 'b', number: 2 },
      { advantage: false, modifier: 0, name: 'c', tag: 'red', number: 1 },
      { advantage: false, modifier: 0, name: 'a', number: 1 },
      { advantage: false, modifier: 0, name: 'c', tag: 'red', number: 2 },
    ]
    const sorted = [
      { advantage: true, modifier: 0, name: 'b', number: 1 },
      { advantage: true, modifier: 0, name: 'b', number: 2 },
      { advantage: false, modifier: 0, name: 'd', tag: 'blue', number: 2 },
      { advantage: false, modifier: 0, name: 'c', tag: 'red', number: 1 },
      { advantage: false, modifier: 0, name: 'c', tag: 'red', number: 2 },
      { advantage: false, modifier: 0, name: 'a', number: 1 },
      { advantage: false, modifier: 0, name: 'a', number: 2 },
    ]
    expect(f.sortCreaturesArray(creatures)).toEqual(sorted)
  })
  it('should sort creatures with higher modifiers higher, all else being equal', () => {
    const creatures = [
      { name: 'a', number: 1, advantage: false, modifier: 0 },
      { name: 'a', number: 1, advantage: false, modifier: 2 },
    ]
    const sorted = [
      { name: 'a', number: 1, advantage: false, modifier: 2 },
      { name: 'a', number: 1, advantage: false, modifier: 0 },
    ]
    expect(f.sortCreaturesArray(creatures)).toEqual(sorted)
  })
  it('should sort creatures in ascending order, all else being equal', () => {
    const creatures = [
      { name: 'a', number: 1, advantage: false, modifier: 0, order: 2 },
      { name: 'a', number: 1, advantage: false, modifier: 0, order: 1 },
    ]
    const sorted = [
      { name: 'a', number: 1, advantage: false, modifier: 0, order: 1 },
      { name: 'a', number: 1, advantage: false, modifier: 0, order: 2 },
    ]
    expect(f.sortCreaturesArray(creatures)).toEqual(sorted)
  })
  it('should sort creatures by name, number, tag, advantage, modifier, then order [integration test]', () => {
    const creatures = [
      { advantage: false, modifier: 0, name: 'a', number: 1, order: 6 },
      { advantage: false, modifier: 7, name: 'c', number: 1, order: 3, tag: 'red' },
      { advantage: false, modifier: 0, name: 'z', order: 1 },
      { advantage: true, modifier: 5, name: 'b', number: 1, order: 2 },
      { advantage: false, modifier: 0, name: 'a', number: 2, order: 5 },
      { advantage: false, modifier: 7, name: 'c', number: 2, order: 3, tag: 'red' },
      { advantage: false, modifier: 6, name: 'd', tag: 'blue', order: 4, number: 2 },
      { advantage: true, modifier: 5, name: 'b', number: 2, order: 2 },
    ]
    const sorted = [
      { advantage: false, modifier: 0, name: 'z', order: 1 },
      { advantage: true, modifier: 5, name: 'b', number: 1, order: 2 },
      { advantage: true, modifier: 5, name: 'b', number: 2, order: 2 },
      { advantage: false, modifier: 7, name: 'c', number: 1, order: 3, tag: 'red' },
      { advantage: false, modifier: 7, name: 'c', number: 2, order: 3, tag: 'red' },
      { advantage: false, modifier: 6, name: 'd', tag: 'blue', order: 4, number: 2 },
      { advantage: false, modifier: 0, name: 'a', number: 2, order: 5 },
      { advantage: false, modifier: 0, name: 'a', number: 1, order: 6 },
    ]
    expect(f.sortCreaturesArray(creatures)).toEqual(sorted)
  })
})

// d20
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

// d20A
// Note that these tests do not test anything specific to rolling with advantage!
describe('`d20A` reducer function', () => {
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

// incrementGroupInitiativeOrder
describe('`incrementGroupInitiativeOrder` reducer function', () => {
  it('should return an Array', () => {
    const payload = { groupID: 'c' }
    const creatures = [
      { name: 'ann', modifier: 0, advantage: false, groupID: 'a', order: 1 },
      {
        name: 'bob',
        modifier: 0,
        advantage: false,
        groupID: 'b',
        order: 2,
      },
      {
        name: 'bob',
        modifier: 0,
        advantage: false,
        groupID: 'b',
        order: 2,
      },
      { name: 'cam', modifier: 0, advantage: false, groupID: 'c', order: 3 },
    ]
    expect(Array.isArray(f.incrementGroupInitiativeOrder(payload, creatures))).toBeTruthy()
  })
  it('should return an Array of the same length as its argument', () => {
    const payload = { groupID: 'c' }
    const creatures = [
      { name: 'ann', modifier: 0, advantage: false, groupID: 'a', order: 1 },
      {
        name: 'bob',
        modifier: 0,
        advantage: false,
        groupID: 'b',
        order: 2,
      },
      {
        name: 'bob',
        modifier: 0,
        advantage: false,
        groupID: 'b',
        order: 2,
      },
      { name: 'cam', modifier: 0, advantage: false, groupID: 'c', order: 3 },
    ]

    expect(f.incrementGroupInitiativeOrder(payload, creatures).length).toBe(creatures.length)
  })
  it("should not change anything if the target creature's order is 0", () => {
    const payload = { groupID: 'a' }
    const creatures = [
      { groupID: 'a', order: 0 },
      { groupID: 'b', order: 1 },
      { groupID: 'b', order: 1 },
      { groupID: 'c', order: 2 },
    ]
    expect(f.incrementGroupInitiativeOrder(payload, creatures)).toEqual(creatures)
  })
  it("should decrement the target creature's order by 1 otherwise", () => {
    const payload = { groupID: 'c' }
    const targetCreaturesOrder = 3
    const creatures = [
      { name: 'ann', modifier: 0, advantage: false, groupID: 'a', order: 1 },
      {
        name: 'bob',
        modifier: 0,
        advantage: false,
        groupID: 'b',
        order: 2,
      },
      {
        name: 'bob',
        modifier: 0,
        advantage: false,
        groupID: 'b',
        order: 2,
      },
      { name: 'cam', modifier: 0, advantage: false, groupID: 'c', order: targetCreaturesOrder },
    ]

    const result = f.incrementGroupInitiativeOrder(payload, creatures)
    const updatedTargetCreaturesGroup = result.filter(c => c.groupID === payload.groupID)
    const newOrder = targetCreaturesOrder - 1
    updatedTargetCreaturesGroup.forEach(p => {
      expect(p.order).toBe(newOrder)
    })
  })
  it("should increment the preceding group of creatures' order by 1", () => {
    const payload = { groupID: 'c' }
    const preceedingCreaturesGroupOrder = 2
    const creatures = [
      { name: 'ann', modifier: 0, advantage: false, groupID: 'a', order: 1 },
      {
        name: 'bob',
        modifier: 0,
        advantage: false,
        groupID: 'b',
        order: preceedingCreaturesGroupOrder,
      },
      {
        name: 'bob',
        modifier: 0,
        advantage: false,
        groupID: 'b',
        order: preceedingCreaturesGroupOrder,
      },
      { name: 'cam', modifier: 0, advantage: false, groupID: 'c', order: 3 },
    ]

    const result = f.incrementGroupInitiativeOrder(payload, creatures)
    const formerlyPreceedingCreatureGroup = result.filter(c => c.groupID === 'b')
    const newOrder = preceedingCreaturesGroupOrder + 1
    formerlyPreceedingCreatureGroup.forEach(p => {
      expect(p.order).toBe(newOrder)
    })
  })
  // it('should return an Array sorted in ascending order', () => {})
})
