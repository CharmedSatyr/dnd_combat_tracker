import React from 'react'
import PropTypes from 'prop-types'

import { Label } from 'react-bootstrap'
import { monsterPropTypes } from '../../constants/propTypes'

import { AdvantageIcon, HourglassIcon, MonsterIcon, RemoveIcon } from '../Icons'
import IncrementDecrementButtons from './IncrementDecrementButtons'

import { setLabel, initiativeLength } from '../component.functions'

const MonsterListGroupItem = ({ monster, removeCreature }) => (
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
    {monster.order && <IncrementDecrementButtons groupID={monster.groupID} />}
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
      {/* MID CENTER */}
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
      {/* LOW CENTER */}
      {monster.legendary > 0 && (
        <div>
          <span>
            <span style={{ color: '#555' }}>Legendary Actions:&nbsp;</span>
            <strong>{monster.legendary}</strong>
          </span>
        </div>
      )}
      {monster.lair > 0 && (
        <div>
          <span>
            <span style={{ color: '#555' }}>Lair Action Initiative Count:&nbsp;</span>
            <strong>{monster.lair}</strong>
          </span>
        </div>
      )}
    </div>
    {/* RIGHT */}
    <div style={{ fontSize: '200%', width: 'auto' }}>
      <strong>
        {(monster.initiative && initiativeLength(monster.initiative)) || <HourglassIcon />}
      </strong>
    </div>
  </div>
)

export default MonsterListGroupItem

MonsterListGroupItem.propTypes = {
  ...monsterPropTypes,
  removeCreature: PropTypes.func.isRequired,
}
