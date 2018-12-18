import React from 'react'

import { Label } from 'react-bootstrap'

import { AdvantageIcon, HourglassIcon, MonsterIcon, RemoveIcon } from '../Icons'

const setLabel = (tag, number) => {
  if (tag && number) {
    return `${tag} ${number}`
  } else if (tag) {
    return tag
  } else if (number) {
    return number
  }
}

const initiativeLength = initiative => {
  const il = initiative.toString()
  return il.length === 1 ? <span>&nbsp;{il}</span> : il
}

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
        <RemoveIcon id={monster.id} removeCreature={removeCreature} />
      </div>
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
