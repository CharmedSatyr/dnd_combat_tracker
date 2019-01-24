import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'react-bootstrap'
import { playerPropTypes } from '../../constants/propTypes'
import { AdvantageIcon, HourglassIcon, PlayerIcon, RemoveIcon } from '../Icons'

import IncrementDecrementButtons from './IncrementDecrementButtons'

const initiativeLength = initiative => {
  const il = initiative.toString()
  return il.length === 1 ? <span>&nbsp;{il}</span> : il
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
        <RemoveIcon creature={player} removeCreature={removeCreature} />
      </div>
      {/* ORDER CONTROL */}
      {player.order && <IncrementDecrementButtons groupID={player.groupID} />}
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

PlayerListGroupItem.propTypes = {
  ...playerPropTypes,
  removeCreature: PropTypes.func.isRequired,
}
