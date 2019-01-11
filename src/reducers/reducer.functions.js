// Sort creatures into optimal display order
export const sortCreaturesArray = array => {
  // Check creature property types
  array.forEach(creature => {
    if (typeof creature.name !== 'string') {
      throw new Error(
        '`sortCreaturesArray` Error: Every creature must have a `name` property that is a string.'
      )
    }

    if (typeof creature.modifier !== 'number') {
      throw new Error(
        '`sortCreaturesArray` Error: Every creature must have a `modifier` property that is a number.'
      )
    }
    if (typeof creature.advantage !== 'boolean') {
      throw new Error(
        '`sortCreaturesArray` Error: Every creature must have an `advantage` property that is a Boolean.'
      )
    }
  })

  return array.sort((a, b) => {
    // Sort by order
    if (a.order !== b.order) {
      return a.order - b.order
    }

    // else modifier
    if (a.modifier !== b.modifier) {
      return b.modifier - a.modifier
    }

    // else by advantage
    if (a.advantage && !b.advantage) {
      return -1
    } else if (!a.advantage && b.advantage) {
      return 1
    }

    // else by tag
    if (a.tag && b.tag) {
      const at = a.tag.toUpperCase()
      const bt = b.tag.toUpperCase()
      if (at < bt) {
        return -1
      } else if (at > bt) {
        return 1
      } else {
        return 0
      }
    } else if (a.tag) {
      return -1
    } else if (b.tag) {
      return 1
    }

    // else by number
    if (a.number && b.number) {
      return a.number - b.number
    } else if (a.number) {
      return -1
    } else if (b.number) {
      return 1
    }

    // else by name
    const an = a.name.toUpperCase()
    const bn = b.name.toUpperCase()
    if (an < bn) {
      return -1
    } else if (an > bn) {
      return 1
    }

    return 0
  })
}

// Roll a d20 and account for modifier
export const d20 = (modifier = 0) => {
  const mod = parseInt(modifier)
  if (isNaN(mod)) {
    throw new Error('`d20` Error: Argument must be a number')
  }
  const min = 1 + mod
  const max = 20 + mod
  return Math.floor(Math.random() * (max - (min + 1)) + min)
}

// Roll a d20 with advantage and account for modifier
export const d20A = (modifier = 0) => {
  const roll1 = d20(modifier)
  const roll2 = d20(modifier)
  return roll1 >= roll2 ? roll1 : roll2
}

// Given an object of groupID keys and number values,
// return an array of groupIDs where a lower index corresponds to a higher value
export const orderInitiativeGroups = groupIDs =>
  []
    .concat(...Object.entries(groupIDs).sort((a, b) => b[1] - a[1]))
    .filter(o => typeof o === 'string')

// Roll initiative
export const rollInitiative = creaturesArray => {
  let creatures = [...creaturesArray]
  const groupIDs = {}
  // Loop through creatures once
  creatures.forEach(cr => {
    // check groupIDs obj for group's initiative
    if (groupIDs.hasOwnProperty(cr.groupID) && groupIDs[cr.groupID]) {
      cr.initiative = groupIDs[cr.groupID]
      // otherwise roll for initiative!
      // with advantage
    } else if (cr.advantage) {
      groupIDs[cr.groupID] = d20A(cr.modifier)
      cr.initiative = groupIDs[cr.groupID]
      // or without advantage
    } else {
      groupIDs[cr.groupID] = d20(cr.modifier)
      cr.initiative = groupIDs[cr.groupID]
    }
  })

  // Get an array of all the Group or Player IDs in initiative order
  const initiativeOrder = orderInitiativeGroups(groupIDs)

  // Give each creature object an order property based on that
  creatures.forEach(
    cr => (cr.order = initiativeOrder.indexOf(cr.groupID ? cr.groupID : cr.id.split('-')[1]) + 1)
  )

  return creatures
}

// Check that the array's initiative order is valid
// NOTE: Order is ascending though based on descending initiative values
export const isValidInitiativeOrder = creatures =>
  creatures.every((cr, i) => {
    if (i === 0 && cr.order === 1) {
      return true
    } else if (i !== 0 && creatures[i - 1].order <= cr.order) {
      return true
    } else {
      return false
    }
  })

// Find the length of the initiative order, counting groups with the same initiative as one
export const findInitiativeOrderLength = creatures => {
  if (!isValidInitiativeOrder(creatures)) {
    throw new Error('`findInitiativeOrderLength` Error: Argument must have valid initiative order')
  }
  return creatures[creatures.length - 1].order
}
// Increment Group Initiative Order (make creatures' turn later)
export const incrementGroupInitiativeOrder = (payload, creatures) => {
  // Find the index of the first creature in the target group
  const i = creatures.findIndex(c => c.groupID === payload.groupID)
  // Find how many creatures have the target groupID
  const count = creatures.filter(c => c.groupID === payload.groupID).length

  // If the objects exist
  if (creatures[i] && creatures[i + count]) {
    const { groupID } = creatures[i]
    const succeedingGroupID = creatures[i + count].groupID
    const updatedOrder = creatures.map((cr, i) => {
      if (cr.groupID === groupID) {
        cr.order = cr.order + 1
      }
      if (cr.groupID === succeedingGroupID) {
        cr.order = cr.order - 1
      }
      return cr
    })
    return sortCreaturesArray(updatedOrder)
  }
  return creatures
}

// Decrement Group Initiative Order (make creatures' turn earlier)
export const decrementGroupInitiativeOrder = (payload, creatures) => {
  // Find the index of the first creature in the target group
  const i = creatures.findIndex(c => c.groupID === payload.groupID)

  // If the objects exist
  if (creatures[i] && creatures[i - 1]) {
    const { groupID } = creatures[i]
    const preceedingGroupID = creatures[i - 1].groupID
    const updatedOrder = creatures.map((cr, i) => {
      if (cr.groupID === groupID) {
        cr.order = cr.order - 1
      }
      if (cr.groupID === preceedingGroupID) {
        cr.order = cr.order + 1
      }
      return cr
    })
    return sortCreaturesArray(updatedOrder)
  }
  return creatures
}
