import React from 'react'

import { AdvantageIcon, HourglassIcon, PlayerIcon, RemoveIcon } from '../Icons'

import { Label } from 'react-bootstrap'

const initiativeLength = initiative => {
  console.log('il:', initiative.length)
  const il = initiative.toString()
  return il.length === 1 ? `0${il}` : il
}

const PlayerListGroupItem = ({ player, removeCreature }) => {
  return (
    <div
      className="list-group-item"
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {/* LEFT */}
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Label bsStyle="info">{player.order}</Label>
        <RemoveIcon id={player.id} removeCreature={removeCreature} />
      </div>
      {/* CENTER */}
      <div style={{ width: '65%' }}>
        <PlayerIcon />
        <strong>{player.name}</strong>
        <br />
        <span style={{ color: '#555' }}>Modifier:&nbsp;</span>
        <strong>{player.modifier >= 0 ? `+${player.modifier}` : `${player.modifier}`}</strong>
        {player.advantage && <AdvantageIcon />}
      </div>
      {/* RIGHT */}
      <div style={{ fontSize: '200%' }}>
        <strong>
          {typeof player.initiative === 'number' ? (
            initiativeLength(player.initiative)
          ) : (
            <HourglassIcon />
          )}
        </strong>
      </div>
    </div>
  )
}

export default PlayerListGroupItem