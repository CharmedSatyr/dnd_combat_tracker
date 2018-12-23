import * as c from '../constants'

export const saveLocal = newCreatures => {
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

export const removeLocal = id => {
  let creatures
  if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
    creatures = localStorage.getItem(c.LOCAL_CREATURES)
    try {
      creatures = JSON.parse(creatures)
      creatures = creatures.filter(c => c.id !== id)
      creatures = JSON.stringify(creatures)
      localStorage.setItem(c.LOCAL_CREATURES, creatures)
    } catch (e) {
      console.error('removeLocal Error:', e)
    }
  }
}

export const setStateFromLocal = propFunction => {
  if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
    try {
      let localCreatures = localStorage.getItem(c.LOCAL_CREATURES)
      localCreatures = JSON.parse(localCreatures)
      propFunction(localCreatures)
    } catch (e) {
      console.error('Error:', e)
    }
  }
}

export const removeCreatureFromLocal = props => {
  if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
    try {
      let localCreatures = localStorage.getItem(c.LOCAL_CREATURES)
      localCreatures = JSON.parse(localCreatures)
      props.setStateFromLocal(localCreatures)
    } catch (e) {
      console.error('Error:', e)
    }
  }
}
