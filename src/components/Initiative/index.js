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
    let creatureList
    if (creatures) {
      creatureList = creatures.map((c, i) => {
        const player = c.id.split('-')[0] === 'player'
        return player ? (
          <PlayerListGroupItem key={c.id} player={c} removeCreature={removeCreature} />
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
