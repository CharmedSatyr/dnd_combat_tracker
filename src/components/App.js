import React from 'react'
import Initiative from './Initiative/'
import AddCreature from './AddCreature/'
import Experience from './Experience/'
import Combat from './Combat'

import { Grid, PageHeader, Row } from 'react-bootstrap'

const App = () => (
  <Grid style={{ fontFamily: 'Roboto, Helvetica, sans-serif', fontSize: 13 }}>
    <PageHeader>D&amp;D Initiative &amp; Combat Tracker</PageHeader>
    <Row className="show-grid">
      <Combat />
    </Row>
    <Row className="show-grid">
      <AddCreature />
      <Initiative />
      <Experience />
    </Row>
  </Grid>
)

export default App
