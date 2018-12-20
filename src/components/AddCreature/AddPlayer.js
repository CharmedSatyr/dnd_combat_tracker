import React, { Component } from 'react'
import { AdvantageIcon } from '../Icons'

import { saveLocal, setID } from '../component.functions'
import MonsterHunting5E from './MonsterHunting5E'

import { ControlLabel, Button, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap'

const defaultState = {
  name: '',
  modifier: '',
  advantage: false,
  nameValidation: null,
  modValidation: null,
}

export default class AddPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = { ...defaultState }
    this.getName = this.getName.bind(this)
    this.getModifier = this.getModifier.bind(this)
    this.getAdvantage = this.getAdvantage.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
  }
  getAdvantage() {
    this.setState({ advantage: this.refs.adv_checkbox.checked })
  }
  getName(e) {
    e.preventDefault()
    this.setState({ name: e.target.value })
  }
  getModifier(e) {
    e.preventDefault()
    this.setState({ modifier: e.target.value })
  }
  getValidationState(e) {
    e.preventDefault()
    if (this.state.name) {
      this.setState({ nameValidation: 'success' })
    } else {
      this.setState({ nameValidation: 'error' })
    }

    if (this.state.modifier) {
      this.setState({ modValidation: 'success' })
    } else {
      this.setState({ modValidation: 'error' })
    }

    if (this.state.name && this.state.modifier) {
      this.addCreatures()
    }
  }
  addCreatures() {
    const { advantage, modifier, name } = this.state
    const creatures = []
    const creature = {
      name,
      modifier,
      advantage,
      id: `player-${setID()}`,
    }
    creatures.push(creature)
    this.props.addCreatures(creatures)
    saveLocal(creature)
    this.setState(defaultState)
  }
  render() {
    return (
      <Form>
        {/* Player Name */}
        <FormGroup controlId="name" validationState={this.state.nameValidation}>
          <ControlLabel>Player Name</ControlLabel>
          <FormControl
            onChange={this.getName}
            placeholder="Marni Moonfoot"
            type="text"
            value={this.state.name}
          />
          <FormControl.Feedback />
        </FormGroup>

        {/* Initiative Modifier */}
        <FormGroup controlId="initiative" validationState={this.state.modValidation}>
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

        {/* Add Player Button */}
        <FormGroup>
          <Button
            onClick={this.getValidationState}
            style={{ width: '100%' }}
            type="submit"
            className="btn btn-success"
          >
            Add Player
          </Button>
        </FormGroup>

        {/* Auto-Add Monster Hunting 5E Players */}
        <MonsterHunting5E addCreatures={this.props.addCreatures} />
      </Form>
    )
  }
}
