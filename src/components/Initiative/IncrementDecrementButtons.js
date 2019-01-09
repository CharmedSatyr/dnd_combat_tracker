import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'
import { ChevronDownIcon, ChevronUpIcon } from '../Icons'
import * as a from '../../actions'

const IncrementDecrementButtons = ({
  decrementCreatureInitiative,
  groupID,
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
    <Button bsSize="xsmall" onClick={() => incrementCreatureInitiative(groupID)}>
      <ChevronUpIcon />
    </Button>
    <Button bsSize="xsmall" onClick={() => decrementCreatureInitiative(groupID)}>
      <ChevronDownIcon />
    </Button>
  </div>
)

const mapDispatchToProps = dispatch => ({
  decrementCreatureInitiative: groupID => dispatch(a.decrementCreatureInitiative(groupID)),
  incrementCreatureInitiative: groupID => dispatch(a.incrementCreatureInitiative(groupID)),
})

export default connect(
  null,
  mapDispatchToProps
)(IncrementDecrementButtons)

IncrementDecrementButtons.propTypes = {
  decrementCreatureInitiative: PropTypes.func.isRequired,
  groupID: PropTypes.string.isRequired,
  incrementCreatureInitiative: PropTypes.func.isRequired,
}
