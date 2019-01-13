import React from 'react'
import PropTypes from 'prop-types'

import { Label } from 'react-bootstrap'
import { LairActionIcon } from '../Icons'
import IncrementDecrementButtons from './IncrementDecrementButtons'

import { setLabel, initiativeLength } from '../component.functions'

const AddOnListGroupItem = ({ monster }) => (
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

export default AddOnListGroupItem

AddOnListGroupItem.propTypes = {
  monster: PropTypes.shape({
    name: PropTypes.string.isRequired,
    modifier: PropTypes.number.isRequired,
    advantage: PropTypes.bool.isRequired,
    ac: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired,
    xp: PropTypes.number.isRequired,
    lair: PropTypes.number,
    legendary: PropTypes.number,
    tag: PropTypes.string,
    number: PropTypes.number,
    initiative: PropTypes.number,
    order: PropTypes.number,
  }).isRequired,
}
