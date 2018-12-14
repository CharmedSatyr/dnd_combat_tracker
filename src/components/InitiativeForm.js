import React, { Component } from 'react'
import AdvantageIcon from './AdvantageIcon'
import * as c from '../constants'

import { ControlLabel, Button, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap'

export default class InitiativeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: undefined,
      modifier: undefined,
      advantage: false,
      validation: null,
    }
    this.getName = this.getName.bind(this)
    this.getModifier = this.getModifier.bind(this)
    this.getAdvantage = this.getAdvantage.bind(this)
    this.addCreature = this.addCreature.bind(this)
  }
  saveLocal(creature) {
    let creatures
    if (localStorage.hasOwnProperty(c.LOCAL_CREATURES)) {
      creatures = localStorage.getItem(c.LOCAL_CREATURES)
      try {
        creatures = JSON.parse(creatures)
        creatures.push(creature)
        creatures = JSON.stringify(creatures)
        localStorage.setItem(c.LOCAL_CREATURES, creatures)
      } catch (e) {
        console.error('Error:', e)
      }
    } else {
      creatures = []
      creatures.push(creature)
      creatures = JSON.stringify(creatures)
      localStorage.setItem(c.LOCAL_CREATURES, creatures)
    }
  }
  getAdvantage() {
    this.setState({ advantage: this.refs.adv_checkbox.checked })
  }
  getName(e) {
    this.setState({ name: e.target.value })
  }
  getModifier(e) {
    this.setState({ modifier: e.target.value })
  }
  addCreature(e) {
    e.preventDefault()
    if (this.state.name && this.state.modifier) {
      const id = Math.random()
        .toString()
        .slice(2)
      console.log('id:', id)
      const creature = {
        name: this.state.name,
        modifier: this.state.modifier,
        advantage: this.state.advantage,
        id,
      }
      this.props.addCreature(creature)
      this.saveLocal(creature)
      this.setState({ name: undefined, modifier: undefined, advantage: false, validation: null })
    } else {
      this.setState({ validation: 'error' })
    }
  }
  render() {
    return (
      <Form>
        {/* Creature Name */}
        <FormGroup controlId="name" validationState={this.state.validation}>
          <ControlLabel>Creature Name</ControlLabel>
          <FormControl
            onChange={this.getName}
            placeholder="Marni Moonfoot"
            type="text"
            value={this.state.name}
          />
          <FormControl.Feedback />
        </FormGroup>

        {/* Initiative Modifier */}
        <FormGroup controlId="initiative" validationState={this.state.validation}>
          <ControlLabel>Initiative Modifier</ControlLabel>
          <InputGroup>
            <FormControl
              onChange={this.getModifier}
              placeholder="5"
              type="number"
              value={this.state.modifier}
            />
            {/* Advantage */}
            <InputGroup.Addon>
              <AdvantageIcon />
              <input
                aria-label="Roll initiative with advantage"
                onChange={this.getAdvantage}
                ref="adv_checkbox"
                title="Rolls with advantage"
                type="checkbox"
                checked={this.state.advantage}
              />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        {/* Button */}
        <FormGroup>
          <Button
            onClick={this.addCreature}
            style={{ width: '100%' }}
            type="submit"
            className="btn btn-success"
          >
            Add
          </Button>
        </FormGroup>
      </Form>
    )
  }
}
