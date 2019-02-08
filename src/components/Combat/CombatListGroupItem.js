import React from 'react'
import { setLabel } from '../component.functions'
import { monsterPropTypes } from '../../constants/propTypes'
import { Label, ListGroupItem } from 'react-bootstrap'
import DamageHealForm from './DamageHealForm'
import { MonsterIcon } from '../Icons'
import ConditionsModal from './ConditionsModal'

import { initiativeLength } from '../component.functions'

const MonsterStats = ({ monster }) => (
  <div>
    <MonsterIcon />
    <strong>{monster.name}</strong>&nbsp;<Label>{setLabel(monster.tag, monster.number)}</Label>
    <br />
    <span style={{ fontSize: 11 }}>
      <span style={{ color: '#555' }}>Initiative Modifier:&nbsp;</span>
      <strong>{monster.modifier >= 0 ? `+${monster.modifier}` : `${monster.modifier}`}</strong>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          <span style={{ color: '#555' }}>AC:&nbsp;</span>
          <strong>{monster.ac}</strong>
        </span>
        <span>
          <span style={{ color: '#555' }}>XP:&nbsp;</span>
          <strong>{monster.xp}</strong>
        </span>
      </div>
    </span>
  </div>
)

const HitPoints = ({ hp }) => (
  <div style={{ height: '100%' }}>
    <div style={{ color: '#555', fontVariant: 'small-caps' }}>hit points</div>
    <span style={{ fontSize: '175%' }}>
      <strong>
        {hp.current}/{hp.max}
      </strong>
    </span>
  </div>
)

const CombatListGroupItem = ({ monster, removeCreature }) => (
  <ListGroupItem
    className="list-group-item"
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
      gridTemplateRows: 'auto auto',
    }}
  >
    {/* LEFT */}
    <div
      style={{
        border: '1px solid #ddd',
        fontVariant: 'small-caps',
        gridRow: '1 / span 2',
      }}
    >
      order
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          fontSize: '200%',
          height: '80%',
          justifyContent: 'center',
        }}
      >
        <strong>{monster.order}</strong>
      </div>
    </div>
    {/* TOP LEFT */}
    <div
      style={{
        borderRight: '1px solid #ddd',
        borderTop: '1px solid #ddd',
        placeSelf: 'stretch stretch',
      }}
    >
      <MonsterStats monster={monster} />
    </div>
    {/* TOP CENTER */}
    <div
      style={{
        borderTop: '1px solid #ddd',
        placeSelf: 'stretch center',
      }}
    >
      <DamageHealForm monster={monster} />
    </div>
    {/* TOP RIGHT */}
    <div
      style={{
        borderLeft: '1px solid #ddd',
        borderTop: '1px solid #ddd',
        placeSelf: 'stretch center',
      }}
    >
      <HitPoints hp={monster.hp} />
    </div>
    {/* RIGHT */}
    <div
      style={{
        border: '1px solid #ddd',
        gridColumn: '5',
        gridRow: '1 / span 2',
        placeSelf: 'stretch stretch',
      }}
    >
      <span style={{ fontVariant: 'small-caps' }}>initiative</span>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          fontSize: '200%',
          height: '80%',
          justifyContent: 'center',
          width: 'auto',
        }}
      >
        <strong>{monster.initiative && initiativeLength(monster.initiative)}</strong>
      </div>
    </div>
    {/* BOTTOM LEFT */}
    <div
      style={{
        borderBottom: '1px solid #ddd',
        borderTop: '1px solid #ddd',
        placeSelf: 'stretch stretch',
      }}
    >
      <span style={{ color: '#555', fontVariant: 'small-caps' }}>special</span>
      {monster.lair && (
        <div style={{ fontSize: 11 }}>
          <span>
            <span style={{ color: '#555' }}>Lair Action Initiative:&nbsp;</span>
            <strong>{monster.lair}</strong>
          </span>
        </div>
      )}
      {monster.legendary && (
        <div style={{ fontSize: 11 }}>
          <span>
            <span style={{ color: '#555' }}>Legendary Actions:&nbsp;</span>
            <strong>{monster.legendary}</strong>
          </span>
        </div>
      )}
    </div>
    {/* BOTTOM CENTER/RIGHT */}
    <div
      style={{
        borderBottom: '1px solid #ddd',
        borderLeft: '1px solid #ddd',
        borderTop: '1px solid #ddd',
        placeSelf: 'stretch stretch',
        gridColumn: '3 / span 2',
      }}
    >
      <span style={{ color: '#555', fontVariant: 'small-caps' }}>current conditions</span>
      <ConditionsModal monster={monster} />
    </div>
  </ListGroupItem>
)

export default CombatListGroupItem

CombatListGroupItem.propTypes = monsterPropTypes
