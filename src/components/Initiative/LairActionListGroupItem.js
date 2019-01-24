import React from 'react'
import { Label } from 'react-bootstrap'
import { LairActionIcon } from '../Icons'
import { lairActionPropTypes } from '../../constants/propTypes'
import IncrementDecrementButtons from './IncrementDecrementButtons'

import { setLabel, initiativeLength } from '../component.functions'

const LairActionListGroupItem = ({ monster }) => (
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
    </div>
    {/* ORDER CONTROL */}
    {monster.order && <IncrementDecrementButtons groupID={monster.groupID} />}
    {/* CENTER */}
    <div style={{ width: '65%' }}>
      <LairActionIcon />
      &nbsp; Lair Action for&nbsp;<strong>{monster.name}</strong>&nbsp;
      <Label>{setLabel(monster.tag, monster.number)}</Label>
    </div>
    {/* RIGHT */}
    <div style={{ fontSize: '200%', width: 'auto' }}>
      <strong>{initiativeLength(monster.initiative)}</strong>
    </div>
  </div>
)

export default LairActionListGroupItem

LairActionListGroupItem.propTypes = {
  ...lairActionPropTypes,
}
