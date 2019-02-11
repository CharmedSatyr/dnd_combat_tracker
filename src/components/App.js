import React from 'react'
import AddCreature from './AddCreature/'
import Experience from './Experience/'

import InfoContainer from './InfoContainer'
import { Grid, Row } from 'react-bootstrap'

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
      <InfoContainer />
    </Row>
  </Grid>
)

export default App
