import React from 'react'
import { setLabel } from '../component.functions'
import { monsterPropTypes } from '../../constants/propTypes'
import { Label, ListGroupItem } from 'react-bootstrap'
import DamageHealForm from './DamageHealForm'
import { MonsterIcon } from '../Icons'
import ConditionsModal from './ConditionsModal'

const MonsterStats = ({ monster }) => (
  <div>
    <MonsterIcon />
    <strong>{monster.name}</strong>&nbsp;<Label>{setLabel(monster.tag, monster.number)}</Label>
    <br />
    <span style={{ color: '#555' }}>Modifier:&nbsp;</span>
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
  </div>
)

const HitPoints = ({ hp }) => (
  <div>
    <div style={{ color: '#555', fontVariant: 'small-caps', textAlign: 'center' }}>hit points</div>
    <span style={{ fontSize: '175%' }}>
      <strong>
        {hp.current}/{hp.max}
      </strong>
    </span>
  </div>
)

const CombatListGroupItem = ({ monster }) => (
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
        border: '0.5px solid #555',
        fontVariant: 'small-caps',
        gridRow: '1 / span 2',
      }}
    >
      order
    </div>
    {/* TOP LEFT */}
    <div style={{ border: '0.5px solid #555', placeSelf: 'stretch stretch' }}>
      <MonsterStats monster={monster} />
    </div>
    {/* TOP CENTER */}
    <div
      style={{
        border: '0.5px solid #555',
        placeSelf: 'stretch center',
      }}
    >
      <DamageHealForm monster={monster} />
    </div>
    {/* TOP RIGHT */}
    <div style={{ border: '0.5px solid #555', placeSelf: 'stretch center' }}>
      <HitPoints hp={monster.hp} />
    </div>
    {/* RIGHT */}
    <div
      style={{
        border: '0.5px solid #555',
        gridColumn: '5',
        gridRow: '1 / span 2',
        placeSelf: 'stretch stretch',
      }}
    >
      <span style={{ fontVariant: 'small-caps' }}>initiative</span>
    </div>
    {/* BOTTOM LEFT */}
    <div
      style={{
        border: '0.5px solid #555',
        placeSelf: 'stretch stretch',
      }}
    >
      <span style={{ color: '#555', fontVariant: 'small-caps' }}>special</span>
      {monster.lair && (
        <div>
          <span>
            <span style={{ color: '#555' }}>Lair Action Initiative Count:&nbsp;</span>
            <strong>{monster.lair}</strong>
          </span>
        </div>
      )}
      {monster.legendary && (
        <div>
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
        border: '0.5px solid #555',
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
