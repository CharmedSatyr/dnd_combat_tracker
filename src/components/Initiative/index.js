import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'

import * as a from '../../actions'

import {
  removeCreatureFromLocalStorage,
  updateCreaturesInLocalStorage,
} from '../localStorage.functions'

import LairActionListGroupItem from './LairActionListGroupItem'
import MonsterListGroupItem from './MonsterListGroupItem'
import PlayerListGroupItem from './PlayerListGroupItem'
import RemoveButtons from './RemoveButtons'
import RollButton from './RollButton'

class Initiative extends Component {
  constructor(props) {
    super(props)
    this.roll = this.roll.bind(this)
  }
  async roll() {
    await this.props.rollInitiative()
    updateCreaturesInLocalStorage(this.props.creatures)
  }
  render() {
    const { creatures, removeCreature } = this.props
    let creatureList
    if (creatures) {
      creatureList = creatures.map((c, i) => {
        switch (c.type) {
          case 'lair-action':
            return <LairActionListGroupItem key={i} monster={c} />
          case 'player':
            return <PlayerListGroupItem key={i} player={c} removeCreature={removeCreature} />
          case 'monster':
            return <MonsterListGroupItem key={i} monster={c} removeCreature={removeCreature} />
          default:
            return null
        }
      })
    }
    return (
      <div>
        <ListGroup>{creatureList}</ListGroup>
        <RollButton rollFunction={this.roll} />
        <hr />
        <RemoveButtons
          creatures={creatures}
          removeCreature={removeCreature}
          removeLocal={removeCreatureFromLocalStorage}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addCreatures: localCreatures => dispatch(a.addCreatures(localCreatures)),
  removeCreature: creature => dispatch(a.removeCreature(creature)),
  rollInitiative: () => dispatch(a.rollInitiative()),
})

export default connect(
  null,
  mapDispatchToProps
)(Initiative)

Initiative.propTypes = {
  addCreatures: PropTypes.func.isRequired,
  removeCreature: PropTypes.func.isRequired,
  rollInitiative: PropTypes.func.isRequired,
}
