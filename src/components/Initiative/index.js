import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Col, ListGroup } from 'react-bootstrap'

import * as a from '../../actions'

import {
  findCreaturesInLocalStorage,
  removeCreatureFromLocalStorage,
} from '../localStorage.functions'

import AddOnListGroupItem from './AddOnListGroupItem'
import MonsterListGroupItem from './MonsterListGroupItem'
import PlayerListGroupItem from './PlayerListGroupItem'
import RemoveButtons from './RemoveButtons'
import RollButton from './RollButton'

class Initiative extends Component {
  componentDidMount() {
    findCreaturesInLocalStorage(this.props.addCreatures)
  }
  render() {
    const { creatures, removeCreature, rollInitiative } = this.props
    let creatureList
    if (creatures) {
      creatureList = creatures.map((c, i) => {
        const type = c.id.split('-')[0]
        if (c.type === 'addon') {
          return <AddOnListGroupItem key={i} monster={c} />
        }
        /* Not using `c.id` for key to avoid problems when saved, static groups are added */
        switch (type) {
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
      creatureList.length > 0 && (
        <Col xs={12} md={4} className="well">
          {creatureList && <ListGroup>{creatureList}</ListGroup>}

          <RollButton rollFunction={rollInitiative} />
          <hr />
          <RemoveButtons
            creatures={creatures}
            removeCreature={removeCreature}
            removeLocal={removeCreatureFromLocalStorage}
          />
        </Col>
      )
    )
  }
}

const mapStateToProps = state => ({ creatures: state.creatures })

const mapDispatchToProps = dispatch => ({
  addCreatures: localCreatures => dispatch(a.addCreatures(localCreatures)),
  removeCreature: creature => dispatch(a.removeCreature(creature)),
  rollInitiative: () => dispatch(a.rollInitiative()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initiative)

Initiative.propTypes = {
  addCreatures: PropTypes.func.isRequired,
  creatures: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      modifier: PropTypes.number,
      advantage: PropTypes.bool,
      ac: PropTypes.number,
      hp: PropTypes.number,
      xp: PropTypes.number,
      lair: PropTypes.number,
      legendary: PropTypes.number,
      initiative: PropTypes.number,
      order: PropTypes.number,
    })
  ).isRequired,
  removeCreature: PropTypes.func.isRequired,
  rollInitiative: PropTypes.func.isRequired,
}
