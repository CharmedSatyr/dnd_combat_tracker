import React from 'react'
import { MonsterIcon } from '../Icons'
import { setLabel } from '../component.functions'
import { creaturePropTypes } from '../../constants/propTypes'
import { Label } from 'react-bootstrap'
import DamageHealForm from './DamageHealForm'

const CombatItem = ({ monster }) => (
  <div
    className="list-group-item"
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
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

/* Blinded
 * Charmed
 * Concentrating
 * Deafened
 * Frightened
 * Grappled
 * Incapacitated
 * Invisible
 * Paralyzed
 * Petrified
 * Poisoned
 * Prone
 * Restrained
 * Stunned
 * Unconscious
 * Exhaustion
 */
