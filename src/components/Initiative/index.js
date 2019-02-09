import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { creaturesPropTypes } from '../../constants/propTypes'

import { ListGroup } from 'react-bootstrap'

import * as a from '../../actions'

import {
  findCreaturesInLocalStorage,
  removeCreatureFromLocalStorage,
} from '../localStorage.functions'

import LairActionListGroupItem from './LairActionListGroupItem'
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
        if (c.type === 'lair-action') {
          return <LairActionListGroupItem key={i} monster={c} />
        }
        /* Not using `c.id` for key to avoid problems when saved, static groups are added */
        switch (c.type) {
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
        <div>
          {creatureList && <ListGroup>{creatureList}</ListGroup>}

          <RollButton rollFunction={rollInitiative} />
          <hr />
          <RemoveButtons
            creatures={creatures}
            removeCreature={removeCreature}
            removeLocal={removeCreatureFromLocalStorage}
          />
        </div>
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
  ...creaturesPropTypes,
  removeCreature: PropTypes.func.isRequired,
  rollInitiative: PropTypes.func.isRequired,
}
