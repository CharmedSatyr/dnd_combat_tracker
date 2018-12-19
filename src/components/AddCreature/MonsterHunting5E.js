import React, { Component } from 'react'

import { saveLocal, setID } from './addCreature.functions'
import { FormGroup, Button } from 'react-bootstrap'

export default class MonsterHunting5E extends Component {
  constructor(props) {
    super(props)
    this.addDefaultPlayers = this.addDefaultPlayers.bind(this)
  }
  addDefaultPlayers(e) {
    e.preventDefault()

    const marni = {
      name: 'Marni Moonfoot',
      modifier: 5,
      advantage: false,
      id: `player-${setID()}`,
    }
    const brunhild = {
      name: 'Brunhild',
      modifier: 4,
      advantage: false,
      id: `player-${setID()}`,
    }
    const keph = {
      name: 'Keph Thrassden',
      modifier: 6,
      advantage: true,
      id: `player-${setID()}`,
    }
    const shadow = {
      name: 'Shadow',
      modifier: 9,
      advantage: false,
      id: `player-${setID()}`,
    }
    const rokas = {
      name: 'Rokas Rothenel',
      modifier: 5,
      advantage: true,
      id: `player-${setID()}`,
    }
    const hishiro = {
      name: 'Hishiro Gozen',
      modifier: 1,
      advantage: false,
      id: `player-${setID()}`,
    }

    const defaultPlayers = [marni, brunhild, keph, hishiro, shadow, rokas]
    defaultPlayers.forEach(d => {
      this.props.addCreature(d)
      saveLocal(d)
    })
  }
  render() {
    return (
      <FormGroup>
        <Button
          onClick={this.addDefaultPlayers}
          style={{ width: '100%' }}
          type="submit"
          className="btn btn-primary"
        >
          Add Witchers
        </Button>
      </FormGroup>
    )
  }
}
