import React from 'react'
import { ListGroup } from 'react-bootstrap'
import CombatListGroupItem from './CombatListGroupItem'

const Combat = ({ creatures }) => {
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
  return <ListGroup>{creatureList}</ListGroup>
}

export default Combat
