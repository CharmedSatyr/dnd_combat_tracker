import React from 'react'
import { setLabel } from '../component.functions'
import { monsterPropTypes } from '../../constants/propTypes'
import { Label } from 'react-bootstrap'
import DamageHealForm from './DamageHealForm'
import { MonsterIcon } from '../Icons'
import ConditionsModal from './ConditionsModal'
import ConditionsList from './ConditionsList'

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
    <span style={{ color: '#555' }}>HIT POINTS&nbsp;</span>
    <br />
    <div style={{ textAlign: 'center' }}>
      <strong>
        {hp.current}/{hp.max}
      </strong>
    </div>
  </div>
)

const CombatItem = ({ monster }) => (
  <div
    className="list-group-item"
    style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gridTemplateRows: 'auto auto auto',
    }}
  >
    {/* TOP LEFT */}
    <div style={{ placeSelf: 'center center' }}>
      <MonsterStats monster={monster} />
    </div>
    {/* TOP CENTER */}
    <div style={{ placeSelf: 'center center' }}>
      <DamageHealForm monster={monster} />
    </div>
    {/* TOP RIGHT */}
    <div style={{ placeSelf: 'center center' }}>
      <HitPoints hp={monster.hp} />
    </div>
    {/* MIDDLE */}
    <div style={{ gridColumn: '1 / span 3' }}>
      <hr />
    </div>
    {/* BOTTOM LEFT */}
    <div style={{ placeSelf: 'center center' }}>
      {monster.legendary && (
        <div>
          <span>
            <span style={{ color: '#555' }}>Legendary Actions:&nbsp;</span>
            <strong>{monster.legendary}</strong>
          </span>
        </div>
      )}
      {monster.lair && (
        <div>
          <span>
            <span style={{ color: '#555' }}>Lair Action Initiative Count:&nbsp;</span>
            <strong>{monster.lair}</strong>
          </span>
        </div>
      )}
    </div>
    {/* BOTTOM CENTER/RIGHT */}
    <div style={{ placeSelf: 'center center', gridColumn: '2 / span 2' }}>
      <span style={{ color: '#555' }}>CURRENT CONDITIONS</span>
      <ConditionsModal monster={monster} />
      {/* <ConditionsList monster={monster} /> */}
    </div>
  </div>
)

export default CombatItem

CombatItem.propTypes = { ...monsterPropTypes }
