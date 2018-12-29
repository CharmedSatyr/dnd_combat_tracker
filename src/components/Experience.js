import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Col } from 'react-bootstrap'

const Experience = ({ playerCount, totalXP }) => (
  <Col xs={12} md={4} className="well">
    Players: {parseInt(playerCount)}
    <br />
    Total Experience: {parseInt(totalXP)}
    <br />
    Experience/Player:{' '}
    {parseInt(playerCount) > 0 ? Math.floor(parseInt(totalXP) / parseInt(playerCount)) : 0}
  </Col>
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
