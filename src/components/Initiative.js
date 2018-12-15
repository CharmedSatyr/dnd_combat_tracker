import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as c from '../constants'
import * as ca from '../actions'

import RollButton from './RollButton'
import AddPlayer from './AddPlayer'
import PlayerListGroupItem from './PlayerListGroupItem'

import { ListGroup } from 'react-bootstrap'

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
    if (creatures) {
      items = creatures
        .sort((a, b) => (b.advantage ? 1 : -1)) // Sort display by Advantage
        .sort((a, b) => b.modifier - a.modifier) // Then by modifier
        .sort((a, b) => b.initiative - a.initiative) // Then by Initiative
        .map((c, i) => (
          <PlayerListGroupItem key={c.id} player={c} removeCreature={removeCreature} />
        ))
    }

    return (
      <div>
        <AddPlayer addCreature={this.props.addCreature} />
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
