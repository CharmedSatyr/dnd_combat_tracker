import { Player } from './creature'

const Brunhild = new Player({ advantage: false, modifier: 4, name: 'Brunhild' })

const Hishiro = new Player({ advantage: false, modifier: 1, name: 'Hishiro Gozen' })

const Keph = new Player({ advantage: true, modifier: 6, name: 'Keph Thrassden' })

const Marni = new Player({ advantage: false, modifier: 5, name: 'Marni Moonfoot' })

const Rokas = new Player({ advantage: true, modifier: 5, name: 'Rokas Rothenel' })

const Shadow = new Player({ advantage: false, modifier: 9, name: 'Shadow' })

export default [Brunhild, Hishiro, Keph, Marni, Rokas, Shadow]
