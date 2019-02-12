import React, { Component } from 'react'
import { /* ControlLabel, FormGroup, */ Modal } from 'react-bootstrap'
import ConditionsMenu from './ConditionsMenu'
import { monsterPropTypes } from '../../constants/propTypes'
import { capitalizeFirstLetter } from '../component.functions'

const showCurrentConditions = monster => {
  const currentConditions = []
  for (let val in monster.conditions) {
    if (val === 'custom') {
      monster.conditions.custom.forEach(c => currentConditions.push(c))
    } else if (val === 'exhaustion') {
      const { level } = monster.conditions.exhaustion
      level > 0 && currentConditions.push(`Exhaustion (Level ${level})`)
    } else if (monster.conditions[val]) {
      currentConditions.push(`${capitalizeFirstLetter(val)}`)
    }
  }
  return currentConditions.length ? (
    currentConditions.sort().join(', ')
  ) : (
    <div style={{ color: '#555', height: '100%' }}>Add Active Conditions</div>
  )
}

export default class ConditionsModal extends Component {
  constructor(props) {
    super(props)
    this.state = { currentConditions: '', show: false }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
  }
  handleClose() {
    this.setState({ show: false })
  }
  handleShow() {
    this.setState({ show: true })
  }
  render() {
    const currentConditions = showCurrentConditions(this.props.monster)
    return (
      <div style={{ height: '80%' }}>
        <div
          style={{
            cursor: 'pointer',
            fontSize: 11,
            height: '100%',
            width: '100%',
          }}
          onClick={this.handleShow}
        >
          {currentConditions}&nbsp;
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Creature Conditions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ConditionsMenu monster={this.props.monster} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

ConditionsModal.propTypes = { ...monsterPropTypes }
