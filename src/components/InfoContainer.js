import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Tab, Tabs } from 'react-bootstrap'
import { creaturesPropTypes } from '../constants/propTypes'
import Combat from './Combat'
import Initiative from './Initiative/'
import * as a from '../actions'
import { findCreaturesInLocalStorage } from './localStorage.functions'

class InfoContainer extends Component {
  componentDidMount() {
    findCreaturesInLocalStorage(this.props.addCreatures)
  }
  render() {
    const { creatures } = this.props
    if (creatures.length > 0) {
      return (
        <Col xs={12} md={5} mdOffset={1} className="well">
          <Tabs defaultActiveKey={1} id="info-tabs">
            <Tab eventKey={1} title="Initiative">
              <Initiative creatures={creatures} />
            </Tab>
            <Tab eventKey={2} title="Monster Conditions">
              <Combat creatures={creatures} />
            </Tab>
          </Tabs>
        </Col>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => ({ creatures: state.creatures })

const mapDispatchToProps = dispatch => ({
  addCreatures: localCreatures => dispatch(a.addCreatures(localCreatures)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoContainer)

InfoContainer.propTypes = { ...creaturesPropTypes }
