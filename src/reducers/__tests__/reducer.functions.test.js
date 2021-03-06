import * as f from '../reducer.functions'
import * as c from '../../constants/index'

// createLairActions
describe('`createLairActions` reducer function', () => {
  it('should return an array', () => {
    const creatures = [
      { name: 'a', number: 1, advantage: false, modifier: 2 },
      { name: 'b', number: undefined, advantage: false, modifier: 2 },
    ]
    expect(Array.isArray(f.createLairActions(creatures))).toBeTruthy()
  })
  it('should create an additional object for each creature that has a `lair` property', () => {
    const creatures = [
      { name: 'a', number: 1, advantage: false, modifier: 2, lair: 20 },
      { name: 'b', number: undefined, advantage: false, modifier: 2 },
    ]
    expect(f.createLairActions(creatures).length).toBe(3)
  })
  it('should add child objects with different groupIDs than their parents', () => {
    const creatures = [
      { name: 'a', groupID: 'r', number: 1, advantage: false, modifier: 2, lair: 20 },
    ]
    expect(f.createLairActions(creatures)).not.toBe(creatures[0].groupID)
  })
  it('should add child objects with a `type` of `lair-action` for creatures with a `lair` property', () => {
    const creatures = [
      { name: 'a', number: 1, advantage: false, modifier: 2, lair: 20 },
      { name: 'b', number: undefined, advantage: false, modifier: 2 },
    ]
    expect(f.createLairActions(creatures)[1].type).toBe('lair-action')
    expect(f.createLairActions(creatures)[2].type).toBeUndefined()
  })
  it('should add child objects with the same `name` as their parents', () => {
    const creatures = [{ name: 'a', number: 1, advantage: false, modifier: 2, lair: 20 }]
    expect(f.createLairActions(creatures)[1].name).toBe(creatures[0].name)
  })
})

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

  it('should return an array', () => {
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
  it('should return an array', () => {
    const groupIDs = { a: 23, b: 1, c: 13 }
    expect(Array.isArray(f.orderInitiativeGroups(groupIDs))).toBeTruthy()
  })
  it('should put the argument keys into order based on descending values', () => {
    const groupIDs = { 7: 23, 1: 1, 2: 13 }
    expect(f.orderInitiativeGroups(groupIDs)).toEqual([7, 2, 1])
  })
})

// isValidInitiativeOrder
describe('`isValidInitiativeOrder` reducer function', () => {
  it('should be Truthy if each initiative order is a duplicate and 1', () => {
    const ordered = [{ order: 1 }, { order: 1 }]
    expect(f.isValidInitiativeOrder(ordered)).toBeTruthy()
  })
  it('should be Truthy if each initiative order is strictly sequential from 1', () => {
    const ordered = [{ order: 1 }, { order: 2 }, { order: 3 }]
    expect(f.isValidInitiativeOrder(ordered)).toBeTruthy()
  })
  it('should be Truthy if sequential initiative order from 1 has duplicates', () => {
    const ordered = [{ order: 1 }, { order: 1 }, { order: 1 }, { order: 2 }]
    expect(f.isValidInitiativeOrder(ordered)).toBeTruthy()
  })
  it('should be Falsy if an array object lacks an order key', () => {
    const disordered = [{}, { order: 1 }, { order: 2 }, { order: 3 }, { order: 4 }]
    expect(f.isValidInitiativeOrder(disordered)).toBeFalsy()
  })
  it("should be Falsy if an array object's order is not a Number", () => {
    const disorderly = [{ order: 'apple' }, { order: 1 }, { order: 2 }, { order: 3 }, { order: 3 }]
    expect(f.isValidInitiativeOrder(disorderly)).toBeFalsy()
  })
  it('should be Falsy if initiative order does not start at 1', () => {
    const disordered = [{ order: 2 }, { order: 2 }, { order: 2 }, { order: 3 }]
    expect(f.isValidInitiativeOrder(disordered)).toBeFalsy()
  })
  it('should be Falsy if initiative order is not sequential', () => {
    const disordered = [{ order: 1 }, { order: 2 }, { order: 4 }, { order: 3 }]
    expect(f.isValidInitiativeOrder(disordered)).toBeFalsy()
  })
  it("should be Falsy if an array object's order is negative", () => {
    const disordered = [{ order: -1 }, { order: 1 }, { order: 2 }, { order: 3 }, { order: 4 }]
    expect(f.isValidInitiativeOrder(disordered)).toBeFalsy()
  })
  it('should be Falsy if initiative order is not sequential, regardless of duplicates', () => {
    const disordered = [{ order: 1 }, { order: 2 }, { order: 1 }, { order: 2 }]
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
    const ordered = [{ order: 1 }, { order: 2 }]
    expect(f.findInitiativeOrderLength(ordered)).toEqual(expect.any(Number))
  })
  it('should return the highest initiative order in the ordered array', () => {
    const ordered = [{ order: 1 }, { order: 2 }, { order: 2 }, { order: 3 }]
    expect(f.findInitiativeOrderLength(ordered)).toBe(3)
  })
})

// decrementGroupInitiativeOrder (make creatures go earlier)
describe('`decrementGroupInitiativeOrder` reducer function', () => {
  it('should return an array', () => {
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
    expect(Array.isArray(f.decrementGroupInitiativeOrder(creatures, payload))).toBeTruthy()
  })
  it('should return an array of the same length as its argument', () => {
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

    expect(f.decrementGroupInitiativeOrder(creatures, payload).length).toBe(creatures.length)
  })
  it("should not change anything if the target creature's order is 1", () => {
    const payload = { groupID: 'a' }
    const creatures = [
      { groupID: 'a', order: 1 },
      { groupID: 'b', order: 2 },
      { groupID: 'b', order: 2 },
      { groupID: 'c', order: 3 },
    ]
    expect(f.decrementGroupInitiativeOrder(creatures, payload)).toEqual(creatures)
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

    const result = f.decrementGroupInitiativeOrder(creatures, payload)
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

    const result = f.decrementGroupInitiativeOrder(creatures, payload)
    const formerlyPreceedingCreatureGroup = result.filter(c => c.groupID === 'b')
    const newOrder = preceedingCreaturesGroupOrder + 1
    formerlyPreceedingCreatureGroup.forEach(p => {
      expect(p.order).toBe(newOrder)
    })
  })
})

// incrementGroupInitiativeOrder (make creatures go later)
describe('`incrementGroupInitiativeOrder` reducer function', () => {
  it('should return an array', () => {
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
    expect(Array.isArray(f.incrementGroupInitiativeOrder(creatures, payload))).toBeTruthy()
  })
  it('should return an array of the same length as its argument', () => {
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

    expect(f.incrementGroupInitiativeOrder(creatures, payload).length).toBe(creatures.length)
  })
  it("should not change anything if the target creature's order is final", () => {
    const payload = { groupID: 'c' }
    const creatures = [
      { groupID: 'a', order: 0 },
      { groupID: 'b', order: 1 },
      { groupID: 'b', order: 1 },
      { groupID: 'c', order: 2 },
    ]
    expect(f.incrementGroupInitiativeOrder(creatures, payload)).toEqual(creatures)
  })
  it("should increment the target creatures' order by 1 otherwise", () => {
    const payload = { groupID: 'a' }
    const targetCreaturesOrder = 1
    const creatures = [
      { name: 'ann', modifier: 0, advantage: false, groupID: 'a', order: targetCreaturesOrder },
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

    const result = f.incrementGroupInitiativeOrder(creatures, payload)
    const updatedTargetCreaturesGroup = result.filter(c => c.groupID === payload.groupID)
    const newOrder = targetCreaturesOrder + 1
    updatedTargetCreaturesGroup.forEach(p => {
      expect(p.order).toBe(newOrder)
    })
  })
  it("should decrement the succeeding group of creatures' order by 1", () => {
    const payload = { groupID: 'a' }
    const succeedingCreaturesGroupOrder = 2
    const creatures = [
      { name: 'ann', modifier: 0, advantage: false, groupID: 'a', order: 1 },
      {
        name: 'bob',
        modifier: 0,
        advantage: false,
        groupID: 'b',
        order: succeedingCreaturesGroupOrder,
      },
      {
        name: 'bob',
        modifier: 0,
        advantage: false,
        groupID: 'b',
        order: succeedingCreaturesGroupOrder,
      },
      { name: 'cam', modifier: 0, advantage: false, groupID: 'c', order: 3 },
    ]

    const result = f.incrementGroupInitiativeOrder(creatures, payload)
    const formerlySucceedingCreatureGroup = result.filter(c => c.groupID === 'b')
    const newOrder = succeedingCreaturesGroupOrder - 1
    formerlySucceedingCreatureGroup.forEach(p => {
      expect(p.order).toBe(newOrder)
    })
  })
})

// updateOrder
describe('`updateOrder` reducer function', () => {
  it('should return an array', () => {
    const creatures = [
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'b', initiative: 8, order: 3 },
    ]
    expect(Array.isArray(f.updateOrder(creatures))).toBeTruthy()
  })
  it('should throw an error if any of the creatures lacks an initiative', () => {
    const creatures = [
      { groupID: 'a', id: '1a', initiative: 10, order: 1 },
      { groupID: 'a', id: '2a', initiative: 10, order: 1 },
      { groupID: 'b', id: '3b', initiative: undefined, order: undefined },
    ]
    expect(() => f.updateOrder(creatures)).toThrow()
  })
  it('should return creatures with updated `order` properties', () => {
    const creatures = [
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'b', initiative: 8, order: 3 },
    ]
    const reordered = [
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'b', initiative: 8, order: 2 },
    ]
    expect(f.updateOrder(creatures)).toEqual(reordered)
  })
})

// assignOrder
describe('`assignOrder` reducer function', () => {
  it('should return an array', () => {
    const creatures = [
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'b', initiative: 8, order: 3 },
    ]
    const initiativeOrder = ['a', 'b']
    expect(Array.isArray(f.assignOrder(creatures, initiativeOrder))).toBeTruthy()
  })
  it('should throw an error if the `orderedGroupIdArray` argument is missing', () => {
    const creatures = [
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'b', initiative: 8, order: 3 },
    ]
    expect(() => f.assignOrder(creatures)).toThrow()
  })
  it('should assign sequential order to creatures objects based on `initiativeOrder`', () => {
    const creatures = [
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'b', initiative: 8, order: 3 },
    ]
    const initiativeOrder = ['a', 'b']
    const reordered = [
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'a', initiative: 10, order: 1 },
      { groupID: 'b', initiative: 8, order: 2 },
    ]
    expect(f.assignOrder(creatures, initiativeOrder)).toEqual(reordered)
  })
})

// damageCreature
describe('`damageCreature` reducer function', () => {
  let creature, payload, state, updated
  beforeEach(() => {
    creature = { id: 100, hp: { current: 8, max: 10 } }
    payload = { creature, damage: 2, type: c.DAMAGE_CREATURE }
    state = [creature]
    updated = [{ id: 100, hp: { current: 6, max: 10 } }]
  })
  it('should return an array', () => {
    expect(Array.isArray(f.damageCreature(state, payload))).toBeTruthy()
  })
  it('should return an array of the same length as the `state` argument', () => {
    expect(f.damageCreature(state, payload).length).toBe(state.length)
  })
  it('should reduce the `hp.current` of the creature with the same `id` as the `creature` argument by `damage` amount', () => {
    expect(f.damageCreature(state, payload)).toEqual(updated)
  })
  it('should not reduce `hp.current` values below 0', () => {
    const deadlyPayload = { creature, damage: 12, type: c.DAMAGE_CREATURE }
    const dead = [{ id: 100, hp: { current: 0, max: 10 } }]
    expect(f.damageCreature(state, deadlyPayload)).toEqual(dead)
  })
})

// healCreature
describe('`healCreature` reducer function', () => {
  const creature = { id: 100, hp: { current: 8, max: 10 } }
  const state = [creature]
  const payload = { creature, healing: 2, type: c.HEAL_CREATURE }
  const updated = [{ id: 100, hp: { current: 10, max: 10 } }]
  it('should return an array', () => {
    expect(Array.isArray(f.healCreature(state, payload))).toBeTruthy()
  })
  it('should return an array of the same length as the `state` argument', () => {
    expect(f.healCreature(state, payload).length).toBe(state.length)
  })
  it('should increase the `hp.current` of the creature with the same `id` as the `creature` argument by `healing` amount', () => {
    expect(f.healCreature(state, payload)).toEqual(updated)
  })
  it('should not raise `hp.current` values above `hp.max`', () => {
    const lovelyPayload = { creature, healing: 12, type: c.HEAL_CREATURE }
    const maxed = [{ id: 100, hp: { current: 10, max: 10 } }]
    expect(f.healCreature(state, lovelyPayload)).toEqual(maxed)
  })
})

// addCustomCondition
describe('`addCustomCondition` reducer function', () => {
  let creature, state, payload, updatedCreature
  beforeEach(() => {
    creature = { id: 100, conditions: { custom: [] } }
    state = [creature]
    payload = {
      creature,
      condition: 'Takes 1d6 fire damage/turn',
      type: c.ADD_CUSTOM_CONDITION,
    }
    updatedCreature = { id: 100, conditions: { custom: ['Takes 1d6 fire damage/turn'] } }
  })

  it('should return an array', () => {
    expect(Array.isArray(f.addCustomCondition(state, payload))).toBeTruthy()
  })
  it('should return an array of the same length as the `state` argument', () => {
    expect(f.addCustomCondition(state, payload).length).toBe(state.length)
  })
  it("should not change target's `conditions.custom` type from array", () => {
    expect(Array.isArray(f.addCustomCondition(state, payload)[0].conditions.custom)).toBeTruthy()
  })
  it("should increase target's `conditions.custom` array length by 1", () => {
    expect(f.addCustomCondition(state, payload)[0].conditions.custom.length).toBe(
      updatedCreature.conditions.custom.length
    )
  })
  it("should add the `condition` argument to the creature's custom conditions array", () => {
    expect(f.addCustomCondition(state, payload)[0].conditions.custom).toEqual(
      expect.arrayContaining([payload.condition])
    )
  })
})

// removeCustomCondition
describe('`removeCustomCondition` reducer function', () => {
  let creature, state, payload, updatedCreature
  beforeEach(() => {
    creature = { id: 100, conditions: { custom: ['Takes 1d6 fire damage/turn'] } }
    state = [creature]
    payload = {
      creature,
      condition: 'Takes 1d6 fire damage/turn',
      type: c.REMOVE_CUSTOM_CONDITION,
    }
    updatedCreature = { id: 100, conditions: { custom: [] } }
  })

  it('should return an array', () => {
    expect(Array.isArray(f.removeCustomCondition(state, payload))).toBeTruthy()
  })
  it('should return an array of the same length as the `state` argument', () => {
    expect(f.removeCustomCondition(state, payload).length).toBe(state.length)
  })
  it("should not change target's `conditions.custom` type from array", () => {
    expect(Array.isArray(f.removeCustomCondition(state, payload)[0].conditions.custom)).toBeTruthy()
  })
  it("should decrease target's `conditions.custom` array length by 1", () => {
    expect(f.removeCustomCondition(state, payload)[0].conditions.custom.length).toBe(
      updatedCreature.conditions.custom.length
    )
  })
  it("should remove the `condition` argument from the creature's custom conditions array", () => {
    expect(f.removeCustomCondition(state, payload)[0].conditions.custom).toEqual(
      expect.not.arrayContaining([payload.condition])
    )
  })
})

// setExhaustionLevel
describe('`setExhaustionLevel` reducer function', () => {
  let creature, state, payload
  beforeEach(() => {
    creature = { id: 100, conditions: { exhaustion: { level: 0 } } }
    state = [creature]
    payload = { creature, level: 2, type: c.SET_EXHAUSTION_LEVEL }
  })

  it('should return an array', () => {
    expect(Array.isArray(f.setExhaustionLevel(state, payload))).toBeTruthy()
  })
  it('should return an array of the same length as the `state` argument', () => {
    expect(f.setExhaustionLevel(state, payload).length).toBe(state.length)
  })
  it("should not change target's `conditions.exhaustion.level` type from number", () => {
    const result = f.setExhaustionLevel(state, payload)
    expect(typeof result[0].conditions.exhaustion.level).toBe('number')
  })
  it("should update the target's `conditions.exhaustion.level` to the value of the `level` argument", () => {
    const result = f.setExhaustionLevel(state, payload)
    const { level } = result[0].conditions.exhaustion
    expect(level).toBe(payload.level)
  })
})

// toggleCondition
describe('`toggleCondition` reducer function', () => {
  let creature, state, payload
  beforeEach(() => {
    creature = { id: 100, conditions: { petrified: false } }
    state = [creature]
    payload = { creature, condition: 'petrified', type: c.TOGGLE_CONDITION }
  })

  it('should return an array', () => {
    expect(Array.isArray(f.toggleCondition(state, payload))).toBeTruthy()
  })
  it('should return an array of the same length as the `state` argument', () => {
    expect(f.toggleCondition(state, payload).length).toBe(state.length)
  })
  it("should not change target's `conditions[`condition`]` type from Boolean", () => {
    const result = f.toggleCondition(state, payload)
    expect(typeof result[0].conditions[payload.condition]).toBe('boolean')
  })
  it("should update the target's `conditions[`condition`]` to the opposite of its previous value", () => {
    const result = f.toggleCondition(state, payload)
    expect(result[0].conditions[payload.condition]).toBeTruthy()
  })
})

/*
describe('`rollInitiativeByGroup` reducer function')
describe('`rollInitiative` reducer function')
*/
