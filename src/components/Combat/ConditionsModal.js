import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { /* ControlLabel, FormGroup, */ Modal } from 'react-bootstrap'
import * as a from '../../actions/'
import Conditions from '../../constants/conditions'
import ConditionsList from './ConditionsList'
import { monsterPropTypes } from '../../constants/propTypes'
// import { capitalizeFirstLetter } from '../component.functions'

class ConditionsModal extends Component {
  constructor(props) {
    super(props)
    this.state = { conditions: new Conditions(), list: [], show: false }
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
    this.props.toggleCondition(this.props.monster, val)
  }
  render() {
    return (
      <div>
        <div style={{ height: '100%', width: '100%' }} onClick={this.handleShow}>
          <ConditionsList monster={this.props.monster} />
          &nbsp;
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Conditions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Conditions:</h4>
            <ul>{}</ul>
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
