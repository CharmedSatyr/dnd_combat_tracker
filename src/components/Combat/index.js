import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import { Col, Label, ListGroup } from 'react-bootstrap'
import { setLabel } from '../component.functions'
// import * as a from '../../actions'
import { MonsterIcon } from '../Icons'
import { creaturesPropTypes } from '../../constants/propTypes'

class Combat extends Component {
  render() {
    const { creatures } = this.props
    let creatureList
    if (creatures) {
      creatureList = creatures.map((c, i) => {
        if (c.type === 'monster') {
          return <MonsterListGroupItem key={i} monster={c} />
        } else {
          return null
        }
      })
    }

    return (
      creatureList.length > 0 && (
        <Col xs={12} md={4} className="well">
          {creatureList && <ListGroup>{creatureList}</ListGroup>}
        </Col>
      )
    )
  }
}

const mapStateToProps = state => ({ creatures: state.creatures })

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Combat)

Combat.propTypes = {
  ...creaturesPropTypes,
}

/* Blinded
 * Charmed
 * Concentrating
 * Deafened
 * Frightened
 * Grappled
 * Incapacitated
 * Invisible
 * Paralyzed
 * Petrified
 * Poisoned
 * Prone
 * Restrained
 * Stunned
 * Unconscious
 * Exhaustion
 */

const MonsterListGroupItem = ({ monster }) => (
  <div
    className="list-group-item"
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    {/* CENTER */}
    <div style={{ width: '65%' }}>
      <MonsterIcon />
      <strong>{monster.name}</strong>&nbsp;
      <Label>{setLabel(monster.tag, monster.number)}</Label>
      <br />
      <span />
      {/* MID CENTER */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          <span style={{ color: '#555' }}>AC:&nbsp;</span>
          <strong>{monster.ac}</strong>
        </span>{' '}
        <span>
          <span style={{ color: '#555' }}>HP:&nbsp;</span>
          <strong>
            {monster.hp.current}/{monster.hp.max}
          </strong>
        </span>{' '}
        <span>
          <span style={{ color: '#555' }}>XP:&nbsp;</span>
          <strong>{monster.xp}</strong>
        </span>
      </div>
      {/* LOW CENTER */}
      {monster.legendary && (
        <div>
          <span>
            <span style={{ color: '#555' }}>Legendary Actions:&nbsp;</span>
            <strong>{monster.legendary}</strong>
          </span>
        </div>
      )}
      {monster.lair && (
        <div>
          <span>
            <span style={{ color: '#555' }}>Lair Action Initiative Count:&nbsp;</span>
            <strong>{monster.lair}</strong>
          </span>
        </div>
      )}
    </div>
  </div>
)
