import * as f from '../reducer.functions'

const creatures = [{ order: 1 }, { order: 1 }, { order: 2 }, { order: 3 }, { order: 3 }]

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
