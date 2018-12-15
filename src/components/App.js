import React, { Component } from 'react'
import Initiative from './Initiative'

import { Grid, PageHeader, Row } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#f9f9f9',
          width: '100%',
          height: '100vh',
        }}
      >
        <Grid>
          <PageHeader>D&amp;D Initiative Tracker</PageHeader>
          <Row className="show-grid">
            <Initiative />
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App
