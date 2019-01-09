import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'
import { ChevronDownIcon, ChevronUpIcon } from '../Icons'
import * as a from '../../actions'

const IncrementDecrementButtons = ({
  decrementGroupInitiativeOrder,
  groupID,
  incrementGroupInitiativeOrder,
}) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Button bsSize="xsmall" onClick={() => decrementGroupInitiativeOrder(groupID)}>
      <ChevronUpIcon />
    </Button>
    <Button bsSize="xsmall" onClick={() => incrementGroupInitiativeOrder(groupID)}>
      <ChevronDownIcon />
    </Button>
  </div>
)

const mapDispatchToProps = dispatch => ({
  decrementGroupInitiativeOrder: groupID => dispatch(a.decrementGroupInitiativeOrder(groupID)),
  incrementGroupInitiativeOrder: groupID => dispatch(a.incrementGroupInitiativeOrder(groupID)),
})

export default connect(
  null,
  mapDispatchToProps
)(IncrementDecrementButtons)

IncrementDecrementButtons.propTypes = {
  decrementGroupInitiativeOrder: PropTypes.func.isRequired,
  groupID: PropTypes.string.isRequired,
  incrementGroupInitiativeOrder: PropTypes.func.isRequired,
}
