import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as c from '../constants'
import * as ca from '../actions'

import AddPlayer from './AddPlayer'
import AddMonster from './AddMonster'
import RollButton from './RollButton'
import PlayerListGroupItem from './PlayerListGroupItem'
import MonsterListGroupItem from './MonsterListGroupItem'

import { Col, ListGroup, Tab, Tabs } from 'react-bootstrap'

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
      <div>
        <Col xs={6} md={4} mdOffset={2} className="well">
          <Tabs defaultActiveKey={1} id="add-creature-tabs">
            <Tab eventKey={1} title="Add Player">
              <AddPlayer addCreature={this.props.addCreature} />
            </Tab>
            <Tab eventKey={2} title="Add Monster">
              <AddMonster addCreature={this.props.addCreature} />
            </Tab>
          </Tabs>
        </Col>
        <Col xs={6} md={4} mdOffset={1} className="well">
          {items && <ListGroup>{items}</ListGroup>}
          <RollButton rollFunction={this.props.rollInitiative} />
        </Col>
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
