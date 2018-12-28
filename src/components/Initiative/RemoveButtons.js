import React from 'react'

import { Button, FormGroup } from 'react-bootstrap'

const RemovePlayers = ({ creatures, removeCreature, removeLocal }) => (
  <FormGroup>
    <Button
      className="btn btn-danger"
      onClick={() => {
        creatures.forEach(cr => {
          if (cr.id.split('-')[0] === 'player') {
            removeCreature(cr)
            removeLocal(cr.id)
          }
        })
      }}
      style={{ width: '100%' }}
    >
      Remove Players
    </Button>
  </FormGroup>
)

const RemoveMonsters = ({ creatures, removeCreature, removeLocal }) => (
  <FormGroup>
    <Button
      className="btn btn-danger"
      onClick={() => {
        creatures.forEach(cr => {
          if (cr.id.split('-')[0] === 'monster') {
            removeCreature(cr)
            removeLocal(cr.id)
          }
        })
      }}
      style={{ width: '100%' }}
    >
      Remove Monsters
    </Button>
  </FormGroup>
)

const RemoveCreatures = ({ creatures, removeCreature, removeLocal }) => (
  <FormGroup>
    <Button
      className="btn btn-danger"
      onClick={() => {
        creatures.forEach(cr => {
          removeCreature(cr.id)

          removeLocal(cr.id)
        })
      }}
      style={{ width: '100%' }}
    >
      Remove Creatures
    </Button>
  </FormGroup>
)

const RemoveButtons = ({ creatures, removeCreature, removeLocal }) => {
  return (
    <span>
      <RemovePlayers
        creatures={creatures}
        removeCreature={removeCreature}
        removeLocal={removeLocal}
      />
      <RemoveMonsters
        creatures={creatures}
        removeCreature={removeCreature}
        removeLocal={removeLocal}
      />
      <RemoveCreatures
        creatures={creatures}
        removeCreature={removeCreature}
        removeLocal={removeLocal}
      />
    </span>
  )
}

export default RemoveButtons
