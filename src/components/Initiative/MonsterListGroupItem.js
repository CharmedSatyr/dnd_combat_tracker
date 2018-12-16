import React from 'react'

import { AdvantageIcon, HourglassIcon, MonsterIcon, RemoveIcon } from '../Icons'

const MonsterListGroupItem = ({ monster, removeCreature }) => {
  return (
    <div className="list-group-item">
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <RemoveIcon id={monster.id} removeCreature={removeCreature} />
          <MonsterIcon />
          <strong>{monster.name}</strong>
          <br />
          <span style={{ color: '#555' }}>Modifier:&nbsp;</span>
          <strong>{monster.modifier >= 0 ? `+${monster.modifier}` : `${monster.modifier}`}</strong>
          {monster.advantage && <AdvantageIcon />}
        </div>
        <div style={{ fontSize: '200%' }}>
          <strong>
            {typeof monster.initiative === 'number' ? monster.initiative : <HourglassIcon />}
          </strong>
        </div>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <span>
          <span style={{ color: '#555' }}>AC:&nbsp;</span>
          <strong>{monster.ac}</strong>
        </span>
        <span>
          <span style={{ color: '#555' }}>HP:&nbsp;</span>
          <strong>{monster.hp}</strong>
        </span>
        <span>
          <span style={{ color: '#555' }}>XP:&nbsp;</span>
          <strong>{monster.xp}</strong>
        </span>
      </div>
    </div>
  )
}

export default MonsterListGroupItem
