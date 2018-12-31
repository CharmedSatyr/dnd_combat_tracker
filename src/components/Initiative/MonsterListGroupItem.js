import React from 'react'
import PropTypes from 'prop-types'

import { Label } from 'react-bootstrap'

import { AdvantageIcon, HourglassIcon, MonsterIcon, RemoveIcon } from '../Icons'
import IncrementDecrementButtons from './IncrementDecrementButtons'

import { setLabel, initiativeLength } from '../component.functions'

const MonsterListGroupItem = ({ monster, removeCreature }) => {
  return (
    <div
      className="list-group-item"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* LEFT */}
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Label bsStyle="info">{monster.order}</Label>
        <RemoveIcon creature={monster} removeCreature={removeCreature} />
      </div>
      {/* ORDER CONTROL */}
      {monster.order && <IncrementDecrementButtons id={monster.id} />}
      {/* CENTER */}
      <div style={{ width: '65%' }}>
        <MonsterIcon />
        <strong>{monster.name}</strong>&nbsp;
        <Label>{setLabel(monster.tag, monster.number)}</Label>
        <br />
        <span>
          <span style={{ color: '#555' }}>Modifier:&nbsp;</span>
          <strong>{monster.modifier >= 0 ? `+${monster.modifier}` : `${monster.modifier}`}</strong>
          {monster.advantage && <AdvantageIcon />}
        </span>
        {/* LOW CENTER */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            <span style={{ color: '#555' }}>AC:&nbsp;</span>
            <strong>{monster.ac}</strong>
          </span>{' '}
          <span>
            <span style={{ color: '#555' }}>HP:&nbsp;</span>
            <strong>{monster.hp}</strong>
          </span>{' '}
          <span>
            <span style={{ color: '#555' }}>XP:&nbsp;</span>
            <strong>{monster.xp}</strong>
          </span>
        </div>
      </div>
      {/* RIGHT */}
      <div style={{ fontSize: '200%', width: 'auto' }}>
        <strong>
          {typeof monster.initiative === 'number' ? (
            initiativeLength(monster.initiative)
          ) : (
            <HourglassIcon />
          )}
        </strong>
      </div>
    </div>
  )
}

export default MonsterListGroupItem

MonsterListGroupItem.propTypes = {
  monster: PropTypes.shape({
    name: PropTypes.string.isRequired,
    modifier: PropTypes.number.isRequired,
    advantage: PropTypes.bool.isRequired,
    ac: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired,
    xp: PropTypes.number.isRequired,
    initiative: PropTypes.number,
    order: PropTypes.number,
  }).isRequired,
  removeCreature: PropTypes.func.isRequired,
}
