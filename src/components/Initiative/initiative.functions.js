import * as c from '../../constants'

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
