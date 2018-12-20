import { setID } from '../components/component.functions'

const brunhild = {
  name: 'Brunhild',
  modifier: 4,
  advantage: false,
  id: `player-${setID()}`,
}
const hishiro = {
  name: 'Hishiro Gozen',
  modifier: 1,
  advantage: false,
  id: `player-${setID()}`,
}
const keph = {
  name: 'Keph Thrassden',
  modifier: 6,
  advantage: true,
  id: `player-${setID()}`,
}
const marni = {
  name: 'Marni Moonfoot',
  modifier: 5,
  advantage: false,
  id: `player-${setID()}`,
}
const rokas = {
  name: 'Rokas Rothenel',
  modifier: 5,
  advantage: true,
  id: `player-${setID()}`,
}
const shadow = {
  name: 'Shadow',
  modifier: 9,
  advantage: false,
  id: `player-${setID()}`,
}

export default [marni, brunhild, keph, shadow, rokas, hishiro]
