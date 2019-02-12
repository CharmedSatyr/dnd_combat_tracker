import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import CombatListGroupItem from './CombatListGroupItem'

const Combat = ({ creatures }) => {
  let creatureList
  if (creatures) {
    creatureList = creatures
      .map((c, i) => {
        if (c.type === 'monster') {
          return <CombatListGroupItem key={i} monster={c} />
        } else {
          return null
        }
      })
      .filter(c => c)
  }
  return (
    <ListGroup>
      {creatureList.length > 0 ? (
        creatureList
      ) : (
        <ListGroupItem className="list-group-item">
          <strong>No monsters have been added.</strong>
        </ListGroupItem>
      )}
    </ListGroup>
  )
}

export default Combat
