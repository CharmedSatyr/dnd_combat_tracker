import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'
import { ChevronDownIcon, ChevronUpIcon } from '../Icons'
import * as a from '../../actions'

const IncrementDecrementButtons = ({
  decrementCreatureInitiative,
  id,
  incrementCreatureInitiative,
}) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Button bsSize="xsmall" onClick={() => incrementCreatureInitiative(id)}>
      <ChevronUpIcon />
    </Button>
    <Button bsSize="xsmall" onClick={() => decrementCreatureInitiative(id)}>
      <ChevronDownIcon />
    </Button>
  </div>
)

const mapDispatchToProps = dispatch => ({
  decrementCreatureInitiative: id => dispatch(a.decrementCreatureInitiative(id)),
  incrementCreatureInitiative: id => dispatch(a.incrementCreatureInitiative(id)),
})

export default connect(
  null,
  mapDispatchToProps
)(IncrementDecrementButtons)

IncrementDecrementButtons.propTypes = {
  decrementCreatureInitiative: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  incrementCreatureInitiative: PropTypes.func.isRequired,
}
