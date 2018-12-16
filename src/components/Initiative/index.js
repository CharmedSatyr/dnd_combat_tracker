import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as c from '../../constants'
import * as ca from '../../actions'

import RollButton from './RollButton'
import PlayerListGroupItem from './PlayerListGroupItem'
import MonsterListGroupItem from './MonsterListGroupItem'

import { Col, ListGroup } from 'react-bootstrap'

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
        .sort((a, b) => (a.name > b.name ? -1 : 1)) // Sort alphabetically by name
        .sort(
          (a, b) =>
            a.tag &&
            b.tag &&
            a.tag.split(' ')[a.tag.split(' ').length - 1] -
              b.tag.split(' ')[b.tag.split(' ').length - 1]
        ) // Then by tag number (for Monsters)
        .sort((a, b) => (a.tag < b.tag ? -1 : 1)) // Then alphabetically by tag
        .sort((a, b) => (b.advantage ? 1 : -1)) // Sort display by Advantage
        .sort((a, b) => b.modifier - a.modifier) // Then by modifier
        .sort((a, b) => b.initiative - a.initiative) // Then by Initiative
        .map((c, i) => {
          const player = c.id.split('-')[0] === 'player'
          return player ? (
            <PlayerListGroupItem key={c.id} player={c} removeCreature={removeCreature} />
          ) : (
            <MonsterListGroupItem key={c.id} monster={c} removeCreature={removeCreature} />
          )
        })
    }

    return (
      items.length > 0 && (
        <Col xs={12} md={4} className="well">
          {items && <ListGroup>{items}</ListGroup>}
          <RollButton rollFunction={this.props.rollInitiative} />
        </Col>
      )
    )
  }
}

const mapStateToProps = (state, props) => ({ creatures: state.creatures })

const mapDispatchToProps = dispatch => ({
  removeCreature: id => dispatch(ca.removeCreature(id)),
  rollInitiative: () => dispatch(ca.rollInitiative()),
  setStateFromLocal: localCreatures => dispatch(ca.setStateFromLocal(localCreatures)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initiative)
