import React from 'react'
import { MonsterIcon } from '../Icons'
import { setLabel } from '../component.functions'
import { creaturePropTypes } from '../../constants/propTypes'
import { Label } from 'react-bootstrap'
import DamageHealForm from './DamageHealForm'

const Conditions = ({ monster }) => {
  const list = []
  for (let val in monster.conditions) {
    const { level } = monster.conditions.exhaustion
    if (val === 'custom') {
      monster.conditions[val].forEach(c => list.push(<li key={c}>{c}</li>))
    } else if (val === 'exhaustion') {
      level > 0 && list.push(<li key={level}>Exhaustion (Level {level})</li>)
    } else if (monster.conditions[val]) {
      list.push(<li key={val}>{val}</li>)
    }
  }
  return <ul>{list}</ul>
}

Conditions.propTypes = { ...creaturePropTypes }

const CombatItem = ({ monster }) => (
  <div
    className="list-group-item"
    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
  >
    {/* CENTER */}
    <div style={{ width: '65%' }}>
      <MonsterIcon />
      <strong>{monster.name}</strong>&nbsp;
      <Label>{setLabel(monster.tag, monster.number)}</Label>
      <br />
      <span />
      {/* MID CENTER */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          <span style={{ color: '#555' }}>AC:&nbsp;</span>
          <strong>{monster.ac}</strong>
        </span>{' '}
        <span>
          <span style={{ color: '#555' }}>XP:&nbsp;</span>
          <strong>{monster.xp}</strong>
        </span>
      </div>
      {/* LOW CENTER */}
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
      <Conditions monster={monster} />
    </div>
    <div>
      <DamageHealForm monster={monster} />
      <span style={{ color: '#555' }}>HP:&nbsp;</span>
      <strong>
        {monster.hp.current}/{monster.hp.max}
      </strong>
    </div>
  </div>
)

export default CombatItem

CombatItem.propTypes = { ...creaturePropTypes }
