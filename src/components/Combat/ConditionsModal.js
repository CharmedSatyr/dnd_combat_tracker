import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, ControlLabel, FormGroup, Modal } from 'react-bootstrap'
import * as a from '../../actions/'
import Conditions from '../../constants/conditions'
import { monsterPropTypes } from '../../constants/propTypes'
import { capitalizeFirstLetter } from '../component.functions'

class ConditionsModal extends Component {
  constructor(props) {
    super(props)
    this.state = { conditions: new Conditions(), show: false }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }
  handleClose() {
    this.setState({ show: false })
  }
  handleShow() {
    this.setState({ show: true })
  }
  handleToggle(val) {
    if (val !== 'custom' && val !== 'exhaustion') {
      this.props.toggleCondition(this.props.monster, val)
    }
  }
  render() {
    const conditions = new Conditions()
    const list = []
    for (let val in conditions) {
      const { level } = conditions.exhaustion
      if (val === 'custom') {
        const subList = []
        conditions[val].forEach(c => subList.push(<li key={c}>{c}</li>))
        list.push(
          <li key={val}>
            Custom Conditions:
            <br />
            {subList}
          </li>
        )
      } else if (val === 'exhaustion') {
        list.push(<li key={level}>Exhaustion (Level {level})</li>)
      } else {
        list.push(
          <li key={val}>
            {
              <FormGroup validationState={null}>
                <ControlLabel>{capitalizeFirstLetter(val)}</ControlLabel>
                <input
                  onChange={this.handleToggle(val)}
                  id={val}
                  type="checkbox"
                  checked={conditions[val]}
                />
              </FormGroup>
            }
          </li>
        )
      }
    }

    return (
      <div>
        <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
          Update Conditions
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Conditions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>This is a thing!</h4>
            <ul>{list}</ul>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addCustomCondition: (creature, condition) => dispatch(a.addCustomCondition(creature, condition)),
  removeCustomCondition: (creature, condition) =>
    dispatch(a.removeCustomCondition(creature, condition)),
  setExhaustionLevel: (creature, level) => dispatch(a.setExhaustionLevel(creature, level)),
  toggleCondition: (creature, condition) => dispatch(a.toggleCondition(creature, condition)),
})

export default connect(
  null,
  mapDispatchToProps
)(ConditionsModal)

ConditionsModal.propTypes = {
  ...monsterPropTypes,
  addCustomCondition: PropTypes.func.isRequired,
  removeCustomCondition: PropTypes.func.isRequired,
  setExhaustionLevel: PropTypes.func.isRequired,
  toggleCondition: PropTypes.func.isRequired,
}
