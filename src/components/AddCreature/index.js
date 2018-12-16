import React from 'react'
import { connect } from 'react-redux'
import * as ca from '../../actions'

import AddPlayer from './AddPlayer'
import AddMonster from './AddMonster'

import { Col, Tab, Tabs } from 'react-bootstrap'

const AddCreature = ({ addCreature, addMonsters }) => (
  <Col xs={12} md={4} className="well">
    <Tabs defaultActiveKey={2} id="add-creature-tabs">
      <Tab eventKey={1} title="Add Player">
        <AddPlayer addCreature={addCreature} />
      </Tab>
      <Tab eventKey={2} title="Add Monster">
        <AddMonster addMonsters={addMonsters} />
      </Tab>
    </Tabs>
  </Col>
)

const mapDispatchToProps = dispatch => ({
  addCreature: creature => dispatch(ca.addCreature(creature)),
  addMonsters: monsters => dispatch(ca.addMonsters(monsters)),
})

export default connect(
  null,
  mapDispatchToProps
)(AddCreature)
