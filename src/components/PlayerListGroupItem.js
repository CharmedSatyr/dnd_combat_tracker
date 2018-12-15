import React from 'react'

import { AdvantageIcon, HourglassIcon, PlayerIcon, RemoveIcon } from './Icons'

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
      <div>
        <RemoveIcon id={player.id} removeCreature={removeCreature} />
        <PlayerIcon />
        <strong>{player.name}</strong>
        <br />
        <span style={{ color: '#555' }}>Modifier:&nbsp;</span>
        <strong>{player.modifier >= 0 ? `+${player.modifier}` : `${player.modifier}`}</strong>
        {player.advantage && <AdvantageIcon />}
      </div>
      <div style={{ fontSize: '200%' }}>
        <strong>{player.initiative || <HourglassIcon />}</strong>
      </div>
    </div>
  )
}

export default PlayerListGroupItem
