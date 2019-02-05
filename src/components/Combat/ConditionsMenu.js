import React from 'react'
import { ListGroup } from 'react-bootstrap'
import ConditionCustom from './ConditionCustom'
import ConditionExhaustion from './ConditionExhaustion'
import ConditionStandard from './ConditionStandard'

const ConditionsMenu = ({ monster }) => {
  const menu = []
  for (let val in monster.conditions) {
    if (val === 'custom') {
      menu.push(<ConditionCustom key={val} monster={monster} />)
    } else if (val === 'exhaustion') {
      menu.push(<ConditionExhaustion key={val} monster={monster} />)
    } else if (val) {
      menu.push(<ConditionStandard key={val} monster={monster} val={val} />)
    }
  }
  return <ListGroup style={{ height: '100%', width: '100%' }}>{menu}</ListGroup>
}

export default ConditionsMenu
