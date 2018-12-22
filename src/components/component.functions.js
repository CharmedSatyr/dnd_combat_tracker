import * as c from '../constants'

// Generate an 18-digit numerical ID
export const setID = () =>
  Math.random()
    .toString()
    .slice(2)

// Save creature array to user's browser cache
export const saveLocal = newCreatures => {
  let existingCreatures
  if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
    existingCreatures = localStorage.getItem(c.LOCAL_CREATURES)
    try {
      existingCreatures = JSON.parse(existingCreatures)
      existingCreatures.push(...newCreatures)
      existingCreatures = JSON.stringify(existingCreatures)
      localStorage.setItem(c.LOCAL_CREATURES, existingCreatures)
    } catch (e) {
      console.error('Error:', e)
    }
  } else {
    existingCreatures = [...newCreatures]
    existingCreatures = JSON.stringify(existingCreatures)
    localStorage.setItem(c.LOCAL_CREATURES, existingCreatures)
  }
}
