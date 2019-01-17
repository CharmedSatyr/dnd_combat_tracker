import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Col } from 'react-bootstrap'

const Experience = ({ playerCount, totalXP, xpPerPlayer }) => (
  <span>
    {totalXP > 0 && (
      <Col xs={12} md={4} className="well">
        <strong>Players:</strong> {playerCount}
        <br />
        <strong>Total Experience:</strong> {totalXP}
        <br />
        <strong>Experience/Player:</strong> {xpPerPlayer}
      </Col>
    )}
  </span>
)

const mapStateToProps = (state, props) => ({
  playerCount: state.experience.playerCount,
  totalXP: state.experience.totalXP,
  xpPerPlayer: state.experience.xpPerPlayer,
})

export default connect(
  mapStateToProps,
  null
)(Experience)

Experience.propTypes = {
  playerCount: PropTypes.number.isRequired,
  totalXP: PropTypes.number.isRequired,
  xpPerPlayer: PropTypes.number.isRequired,
}
