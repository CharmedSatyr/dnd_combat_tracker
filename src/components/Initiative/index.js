import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as a from '../../actions'
import * as c from '../../constants'

import RollButton from './RollButton'
import RemoveButtons from './RemoveButtons'
import PlayerListGroupItem from './PlayerListGroupItem'
import MonsterListGroupItem from './MonsterListGroupItem'

import { setStateFromLocal } from '../localStorage.functions'

import { Col, ListGroup } from 'react-bootstrap'

class Initiative extends Component {
  constructor(props) {
    super(props)
    this.removeLocal = this.removeLocal.bind(this)
  }
  componentDidMount() {
    setStateFromLocal(this.props.setStateFromLocal)
  }
  removeLocal(id) {
    let creatures
    if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
      creatures = localStorage.getItem(c.LOCAL_CREATURES)
      try {
        creatures = JSON.parse(creatures)
        creatures = creatures.filter(c => c.id !== id)
        creatures = JSON.stringify(creatures)
        localStorage.setItem(c.LOCAL_CREATURES, creatures)
      } catch (e) {
        console.error('Error:', e)
      }
    }
  }
  render() {
    const { creatures, removeCreature } = this.props
    let creatureList
    if (creatures) {
      creatureList = creatures.map((c, i) => {
        const player = c.id.split('-')[0] === 'player'
        return player ? (
          <PlayerListGroupItem key={i} player={c} removeCreature={removeCreature} />
        ) : (
          <MonsterListGroupItem key={c.id} monster={c} removeCreature={removeCreature} />
        )
      })
    }

    return (
      creatureList.length > 0 && (
        <Col xs={12} md={4} className="well">
          {creatureList && <ListGroup>{creatureList}</ListGroup>}

          <RollButton rollFunction={this.props.rollInitiative} />
          <hr />
          <RemoveButtons
            creatures={creatures}
            removeCreature={removeCreature}
            removeLocal={this.removeLocal}
          />
        </Col>
      )
    )
  }
}

const mapStateToProps = (state, props) => ({ creatures: state.creatures })

const mapDispatchToProps = dispatch => ({
  removeCreature: creature => dispatch(a.removeCreature(creature)),
  rollInitiative: () => dispatch(a.rollInitiative()),
  setStateFromLocal: localCreatures => dispatch(a.setStateFromLocal(localCreatures)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initiative)
