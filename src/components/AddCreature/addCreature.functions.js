import * as c from '../../constants'

// Use with AddPlayer
export const setID = () =>
  Math.random()
    .toString()
    .slice(2)

export const saveLocal = creature => {
  let creatures
  if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
    creatures = localStorage.getItem(c.LOCAL_CREATURES)
    try {
      creatures = JSON.parse(creatures)
      creatures.push(creature)
      creatures = JSON.stringify(creatures)
      localStorage.setItem(c.LOCAL_CREATURES, creatures)
    } catch (e) {
      console.error('Error:', e)
    }
  } else {
    creatures = [creature]
    creatures = JSON.stringify(creatures)
    localStorage.setItem(c.LOCAL_CREATURES, creatures)
  }
}
