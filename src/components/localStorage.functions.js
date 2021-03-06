import * as c from '../constants'

// Save creature array to user's browser cache
export const saveCreaturesToLocalStorage = newCreatures => {
  let existingCreatures = []
  if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
    try {
      existingCreatures = localStorage.getItem(c.LOCAL_CREATURES)
      existingCreatures = JSON.parse(existingCreatures)
    } catch (err) {
      console.error('saveLocal Error:', err)
    }
  }
  existingCreatures = [...existingCreatures, ...newCreatures]
  existingCreatures = JSON.stringify(existingCreatures)
  localStorage.setItem(c.LOCAL_CREATURES, existingCreatures)
}

// Remove a single creature from user's browser cache
export const removeCreatureFromLocalStorage = creature => {
  let creatures
  if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
    creatures = localStorage.getItem(c.LOCAL_CREATURES)
    try {
      creatures = JSON.parse(creatures)
      creatures = creatures.filter(c => c.id !== creature.id)
      creatures = JSON.stringify(creatures)
      localStorage.setItem(c.LOCAL_CREATURES, creatures)
    } catch (err) {
      console.error('removeLocal Error:', err)
    }
  }
}

// Check user's browser cache for saved creatures
// and execute a callback function on them
export const findCreaturesInLocalStorage = cb => {
  if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
    try {
      let localCreatures = localStorage.getItem(c.LOCAL_CREATURES)
      localCreatures = JSON.parse(localCreatures)
      cb(localCreatures)
    } catch (err) {
      console.error('Error:', err)
    }
  }
}

// Update creatures list
export const updateCreaturesInLocalStorage = updatedArray => {
  if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
    try {
      const update = JSON.stringify(updatedArray)
      localStorage.setItem(c.LOCAL_CREATURES, update)
    } catch (err) {
      console.error('Error:', err)
    }
  }
}
