import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as c from '../constants'
import * as ca from '../actions'

import AdvantageIcon from './AdvantageIcon'
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
    const { creatures } = this.props
    let items
    if (creatures.length) {
      items = creatures.map((c, i) => (
        <ListGroupItem key={i} header={`${c.name}`}>
          Initiative Modifier: {c.modifier >= 0 ? `+${c.modifier}` : `${c.modifier}`}&nbsp;
          {c.advantage && <AdvantageIcon />}
        </ListGroupItem>
      ))
    }

    return (
      <div>
        <InitiativeForm addCreature={this.props.addCreature} />
        {items && <ListGroup>{items}</ListGroup>}
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
    setStateFromLocal: localCreatures => dispatch(ca.setStateFromLocal(localCreatures)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initiative)
