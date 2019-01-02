export const sortCreaturesArray = array =>
  array
    .sort((a, b) => (a.name > b.name ? -1 : 1)) // by name
    .sort((a, b) => a.number && b.number && a.number - b.number) // by tag number
    .sort((a, b) => (b.advantage ? 1 : -1)) // by advantage
    .sort((a, b) => b.modifier - a.modifier) // by modifier
    .sort((a, b) => a.order - b.order) // by order

// Roll a d20 and account for modifier
export const d20 = (modifier = 0) => {
  try {
    const mod = parseInt(modifier)
    const min = 1 + mod
    const max = 20 + mod
    return Math.floor(Math.random() * (max - (min + 1)) + min)
  } catch (err) {
    console.error('d20 Error:', err)
  }
}

// Roll a d20 with advantage and account for modifier
export const d20A = (modifier = 0) => {
  const roll1 = d20(modifier)
  const roll2 = d20(modifier)
  return roll1 >= roll2 ? roll1 : roll2
}

// Roll initiative
export const rollInitiative = creaturesArray => {
  let creatures = [...creaturesArray]
  const groupIDs = {}
  // Loop through creatures once
  creatures.forEach(cr => {
    // If it has a group
    if (cr.groupID) {
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
      // If the creature has no group, use its id
    } else if (cr.id) {
      // only the number part
      const shortID = cr.id.split('-')[1]
      // If it has advantage, roll w/
      if (cr.advantage) {
        groupIDs[shortID] = d20A(cr.modifier)
        cr.initiative = groupIDs[shortID]
        // if it doesn't, don't
      } else {
        groupIDs[shortID] = d20(cr.modifier)
        cr.initiative = groupIDs[shortID]
      }
    }
  })

  // Get an array of all the Group or Player IDs in initiative order
  const initiativeOrder = []
    .concat(...Object.entries(groupIDs).sort((a, b) => b[1] - a[1]))
    .filter(o => typeof o === 'string')

  // Give each creature object an order property based on that
  creatures.forEach(
    cr => (cr.order = initiativeOrder.indexOf(cr.groupID ? cr.groupID : cr.id.split('-')[1]) + 1)
  )
  // Sort creatures
  return sortCreaturesArray(creatures)
}

// Check that the array's initiative order is valid
export const isValidInitiativeOrder = creatures =>
  creatures.every((cr, i) => {
    if (i === 0 && cr.order === 0) {
      return true
    } else if (i !== 0 && creatures[i - 1].order <= cr.order) {
      return true
    } else {
      return false
    }
  })

// Find the length of the initiative order, discounting groups with the same initiative
export const findInitiativeOrderLength = creatures => {
  if (!isValidInitiativeOrder(creatures)) {
    throw new Error('Error: invalid initiative order provided to findInitiativeOrderLength')
  }
  return creatures[creatures.length - 1].order
}
