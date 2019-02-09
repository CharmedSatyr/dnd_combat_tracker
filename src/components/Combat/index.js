import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { creaturesPropTypes } from '../../constants/propTypes'
import CombatListGroupItem from './CombatListGroupItem'

class Combat extends Component {
  render() {
    const { creatures } = this.props
    let creatureList
    if (creatures) {
      creatureList = creatures.map((c, i) => {
        if (c.type === 'monster') {
          return <CombatListGroupItem key={i} monster={c} />
        } else {
          return null
        }
      })
    }
    return (
      creatureList.length > 0 && <div>{creatureList && <ListGroup>{creatureList}</ListGroup>}</div>
    )
  }
}

const mapStateToProps = state => ({ creatures: state.creatures })

export default connect(
  mapStateToProps,
  null
)(Combat)

Combat.propTypes = { ...creaturesPropTypes }
