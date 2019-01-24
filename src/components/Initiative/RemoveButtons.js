import React from 'react'
import PropTypes from 'prop-types'
import { Button, FormGroup } from 'react-bootstrap'
import { creaturesPropTypes } from '../../constants/propTypes'

const RemovePlayers = ({ creatures, removeCreature, removeLocal }) => (
  <FormGroup>
    <Button
      className="btn btn-danger"
      onClick={() => {
        creatures.forEach(cr => {
          if (cr.type === 'player') {
            removeCreature(cr)
            removeLocal(cr)
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
          if (cr.type === 'monster') {
            removeCreature(cr)
            removeLocal(cr)
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
          removeCreature(cr)
          removeLocal(cr)
        })
      }}
      style={{ width: '100%' }}
    >
      Remove Creatures
    </Button>
  </FormGroup>
)

const RemoveButtons = ({ creatures, removeCreature, removeLocal }) => (
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

export default RemoveButtons

RemoveButtons.propTypes = {
  ...creaturesPropTypes,
  removeCreature: PropTypes.func.isRequired,
  removeLocal: PropTypes.func.isRequired,
}
