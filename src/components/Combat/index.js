import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, ListGroup } from 'react-bootstrap'
import { creaturesPropTypes } from '../../constants/propTypes'
import CombatItem from './CombatItem'

class Combat extends Component {
  render() {
    const { creatures } = this.props
    let creatureList
    if (creatures) {
      creatureList = creatures.map((c, i) => {
        if (c.type === 'monster') {
          return <CombatItem key={i} monster={c} />
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

export default connect(
  mapStateToProps,
  null
)(Combat)

Combat.propTypes = { ...creaturesPropTypes }
