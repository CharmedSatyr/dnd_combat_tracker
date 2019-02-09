import React from 'react'
import Initiative from './Initiative/'
import AddCreature from './AddCreature/'
import Experience from './Experience/'
import Combat from './Combat'

import { Col, Grid, Row, Tab, Tabs } from 'react-bootstrap'

const Title = () => (
  <div style={{ margin: '2%' }}>
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <h1>D&amp;D Combat Tracker</h1>
      <Experience />
    </div>
    <hr />
  </div>
)

const App = () => (
  <Grid style={{ fontFamily: 'Roboto, Helvetica, sans-serif', fontSize: 13 }}>
    <Title />
    <Row className="show-grid">
      <AddCreature />
      <Col xs={12} md={6} mdOffset={2} className="well">
        <Tabs defaultActiveKey={1} id="info-tabs">
          <Tab eventKey={1} title="Initiative">
            <Initiative />
          </Tab>
          <Tab eventKey={2} title="Enemy Conditions">
            <Combat />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  </Grid>
)

export default App
