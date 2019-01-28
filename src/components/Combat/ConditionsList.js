import React from 'react'
import { capitalizeFirstLetter } from '../component.functions'
import { monsterPropTypes } from '../../constants/propTypes'

const ConditionsList = ({ monster }) => {
  const list = []
  for (let val in monster.conditions) {
    const { level } = monster.conditions.exhaustion
    if (val === 'custom') {
      monster.conditions[val].forEach(c => list.push(<li key={c}>{c}</li>))
    } else if (val === 'exhaustion') {
      level > 0 && list.push(<li key={level}>Exhaustion (Level {level})</li>)
    } else if (monster.conditions[val]) {
      list.push(<li key={val}>{capitalizeFirstLetter(val)},</li>)
    }
  }
  return <ul style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none' }}>{list}</ul>
}

export default ConditionsList

ConditionsList.propTypes = { ...monsterPropTypes }
