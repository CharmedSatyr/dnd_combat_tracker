import React, { Component } from 'react'
import { AdvantageIcon } from '../Icons'
import * as c from '../../constants'

import { ControlLabel, Button, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap'

const defaultState = {
  name: '',
  modifier: '',
  advantage: false,
  ac: '',
  hp: '',
  xp: '',
  acValidation: null,
  hpValidation: null,
  modValidation: null,
  nameValidation: null,
  xpValidation: null,
}

export default class AddMonster extends Component {
  constructor(props) {
    super(props)
    this.state = { ...defaultState }
    this.getName = this.getName.bind(this)
    this.getModifier = this.getModifier.bind(this)
    this.getAdvantage = this.getAdvantage.bind(this)
    this.getAC = this.getAC.bind(this)
    this.getHP = this.getHP.bind(this)
    this.getXP = this.getXP.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
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
      creatures = [creature]
      creatures = JSON.stringify(creatures)
      localStorage.setItem(c.LOCAL_CREATURES, creatures)
    }
  }
  getAdvantage() {
    this.setState({ advantage: this.refs.adv_checkbox.checked })
  }
  getModifier(e) {
    this.setState({ modifier: e.target.value })
  }
  getName(e) {
    this.setState({ name: e.target.value })
  }
  getAC(e) {
    this.setState({ ac: e.target.value })
  }
  getHP(e) {
    this.setState({ hp: e.target.value })
  }
  getXP(e) {
    this.setState({ xp: e.target.value })
  }
  getValidationState(e) {
    e.preventDefault()

    const { name, modifier, hp, ac, xp } = this.state

    if (name) {
      this.setState({ nameValidation: 'success' })
    } else {
      this.setState({ nameValidation: 'error' })
    }

    if (modifier) {
      this.setState({ modValidation: 'success' })
    } else {
      this.setState({ modValidation: 'error' })
    }

    if (hp) {
      this.setState({ hpValidation: 'success' })
    } else {
      this.setState({ hpValidation: 'error' })
    }

    if (xp) {
      this.setState({ xpValidation: 'success' })
    } else {
      this.setState({ xpValidation: 'error' })
    }

    if (ac) {
      this.setState({ acValidation: 'success' })
    } else {
      this.setState({ acValidation: 'error' })
    }

    if (name && modifier && ac && hp && xp) {
      this.addCreature()
    }
  }
  addCreature() {
    const id = Math.random()
      .toString()
      .slice(2)
    const creature = {
      name: this.state.name,
      modifier: this.state.modifier,
      advantage: this.state.advantage,
      ac: this.state.ac,
      hp: this.state.hp,
      xp: this.state.xp,
      id: `monster-${id}`,
    }
    this.props.addCreature(creature)
    this.saveLocal(creature)
    this.setState(defaultState)
  }
  render() {
    return (
      <Form>
        {/* Monster Name */}
        <FormGroup controlId="name" validationState={this.state.nameValidation}>
          <ControlLabel>Monster Name</ControlLabel>
          <FormControl
            onChange={this.getName}
            placeholder="Beholder"
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
              placeholder="2"
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

        {/* Hit Points */}
        <FormGroup controlId="hit-points" validationState={this.state.hpValidation}>
          <ControlLabel>Hit Points</ControlLabel>
          <InputGroup>
            <FormControl
              onChange={this.getHP}
              placeholder="180"
              type="number"
              value={this.state.hp}
            />
          </InputGroup>
        </FormGroup>

        {/* Armor Class */}
        <FormGroup controlId="armor-class" validationState={this.state.acValidation}>
          <ControlLabel>Armor Class</ControlLabel>
          <InputGroup>
            <FormControl
              onChange={this.getAC}
              placeholder="18"
              type="number"
              value={this.state.ac}
            />
          </InputGroup>
        </FormGroup>

        {/* Experience */}
        <FormGroup controlId="experience" validationState={this.state.xpValidation}>
          <ControlLabel>Experience</ControlLabel>
          <InputGroup>
            <FormControl
              onChange={this.getXP}
              placeholder="10000"
              type="number"
              value={this.state.xp}
            />
          </InputGroup>
        </FormGroup>

        {/* Button */}
        <FormGroup>
          <Button
            onClick={this.getValidationState}
            style={{ width: '100%' }}
            type="submit"
            className="btn btn-success"
          >
            Add Monster
          </Button>
        </FormGroup>
      </Form>
    )
  }
}
