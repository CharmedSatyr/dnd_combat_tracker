import React, { Component } from 'react'
import { FormGroup, Button } from 'react-bootstrap'

import witchers from '../../constants/witchers'
import { saveLocal } from '../component.functions'

export default class MonsterHunting5E extends Component {
  constructor(props) {
    super(props)
    this.addWitchers = this.addWitchers.bind(this)
  }
  addWitchers(e) {
    e.preventDefault()
    this.props.addCreatures(witchers)
    saveLocal(witchers)
  }
  render() {
    return (
      <FormGroup>
        <Button
          onClick={this.addWitchers}
          style={{ width: '100%' }}
          type="submit"
          className="btn btn-primary"
        >
          Add Witchers
        </Button>
      </FormGroup>
    )
  }
}
