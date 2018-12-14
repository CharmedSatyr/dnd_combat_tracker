import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as c from '../constants'
import * as ca from '../actions'

import AdvantageIcon from './AdvantageIcon'
import RemoveIcon from './RemoveIcon'
import RollButton from './RollButton'
import InitiativeForm from './InitiativeForm'

import { ListGroup, ListGroupItem } from 'react-bootstrap'

class Initiative extends Component {
  setStateFromLocal() {
    if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
      try {
        let localCreatures = localStorage.getItem(c.LOCAL_CREATURES)
        localCreatures = JSON.parse(localCreatures)
        this.props.setStateFromLocal(localCreatures)
      } catch (e) {
        console.error('Error:', e)
      }
    }
  }
  componentDidMount() {
    this.setStateFromLocal()
  }
  render() {
    const { creatures, removeCreature } = this.props
    let items
    if (creatures.length) {
      items = creatures
        .map((c, i) => (
          <ListGroupItem key={c.id} header={`${c.name}`}>
            <RemoveIcon id={c.id} removeCreature={removeCreature} />
            Modifier: {c.modifier >= 0 ? `+${c.modifier}` : `${c.modifier}`}
            {c.advantage && <AdvantageIcon />}
            <br />
            Initiative: {c.initiative}
          </ListGroupItem>
        ))
        .sort((a, b) => a.initiative - b.initiative)
    }

    return (
      <div>
        <InitiativeForm addCreature={this.props.addCreature} />
        {items && <ListGroup>{items}</ListGroup>}
        <RollButton rollFunction={this.props.rollInitiative} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    creatures: state.creatures,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCreature: creature => dispatch(ca.addCreature(creature)),
    removeCreature: id => dispatch(ca.removeCreature(id)),
    rollInitiative: () => dispatch(ca.rollInitiative()),
    setStateFromLocal: localCreatures => dispatch(ca.setStateFromLocal(localCreatures)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initiative)
