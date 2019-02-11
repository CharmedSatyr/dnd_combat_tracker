import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'
import { ChevronDownIcon, ChevronUpIcon } from '../Icons'
import * as a from '../../actions'
import { creaturesPropTypes } from '../../constants/propTypes'
import { updateCreaturesInLocalStorage } from '../localStorage.functions'

class IncrementDecrementButtons extends Component {
  constructor(props) {
    super(props)
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
  }
  async decrement() {
    await this.props.decrementGroupInitiativeOrder(this.props.groupID)
    updateCreaturesInLocalStorage(this.props.creatures)
  }
  async increment() {
    await this.props.incrementGroupInitiativeOrder(this.props.groupID)
    updateCreaturesInLocalStorage(this.props.creatures)
  }
  render() {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Button bsSize="xsmall" onClick={this.decrement}>
          <ChevronUpIcon />
        </Button>
        <Button bsSize="xsmall" onClick={this.increment}>
          <ChevronDownIcon />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({ creatures: state.creatures })

const mapDispatchToProps = dispatch => ({
  decrementGroupInitiativeOrder: groupID => dispatch(a.decrementGroupInitiativeOrder(groupID)),
  incrementGroupInitiativeOrder: groupID => dispatch(a.incrementGroupInitiativeOrder(groupID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncrementDecrementButtons)

IncrementDecrementButtons.propTypes = {
  ...creaturesPropTypes,
  decrementGroupInitiativeOrder: PropTypes.func.isRequired,
  groupID: PropTypes.number.isRequired,
  incrementGroupInitiativeOrder: PropTypes.func.isRequired,
}
