import React, { Component } from 'react'
import { AdvantageIcon } from '../Icons'
import { saveLocal } from '../localStorage.functions'
import { setID } from './addCreature.functions'

import {
  ControlLabel,
  Button,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  InputGroup,
  Label,
} from 'react-bootstrap'

const defaultState = {
  name: '',
  modifier: '',
  advantage: false,
  ac: '',
  hp: '',
  xp: '',
  tag: '',
  numLow: '',
  numHigh: '',
  acValidation: null,
  hpValidation: null,
  modValidation: null,
  nameValidation: null,
  xpValidation: null,
  numValidation: null,
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
    this.getTag = this.getTag.bind(this)
    this.getNumHigh = this.getNumHigh.bind(this)
    this.getNumLow = this.getNumLow.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
  }
  getAdvantage() {
    this.setState({ advantage: this.refs.adv_checkbox.checked })
  }
  getModifier(e) {
    e.preventDefault()
    this.setState({ modifier: e.target.value })
  }
  getName(e) {
    e.preventDefault()
    this.setState({ name: e.target.value })
  }
  getAC(e) {
    e.preventDefault()
    this.setState({ ac: e.target.value })
  }
  getHP(e) {
    e.preventDefault()
    this.setState({ hp: e.target.value })
  }
  getXP(e) {
    e.preventDefault()
    this.setState({ xp: e.target.value })
  }
  getNumHigh(e) {
    e.preventDefault()
    this.setState({ numHigh: e.target.value })
  }
  getNumLow(e) {
    e.preventDefault()
    this.setState({ numLow: e.target.value })
  }
  getTag(e) {
    e.preventDefault()
    this.setState({ tag: e.target.value })
  }
  getValidationState(e) {
    e.preventDefault()

    const { name, modifier, hp, ac, xp, numHigh, numLow } = this.state

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

    let validNum
    if (
      (!numHigh && !numLow) ||
      (numHigh && numLow && numLow < numHigh && numLow > 0 && numHigh - numLow <= 10)
    ) {
      validNum = true
      this.setState({ numValidation: 'success' })
    } else {
      this.setState({ numValidation: 'error' })
    }

    if (name && modifier && ac && hp && xp && validNum) {
      this.addMonsters()
    }
  }
  addMonsters() {
    const { name, modifier, advantage, ac, hp, xp, tag, numHigh, numLow } = this.state
    const monsters = []

    const groupID = setID()

    for (let i = numLow || 0; i <= (numHigh || 0); i++) {
      const monster = {
        name,
        modifier,
        advantage,
        ac,
        hp,
        xp,
        tag,
        number: i,
        id: `monster-${setID()}`,
        groupID,
      }
      monsters.push(monster)
    }

    this.props.addCreatures(monsters)
    saveLocal(monsters)
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
          <FormControl
            onChange={this.getHP}
            placeholder="180"
            type="number"
            value={this.state.hp}
          />
        </FormGroup>

        {/* Armor Class */}
        <FormGroup controlId="armor-class" validationState={this.state.acValidation}>
          <ControlLabel>Armor Class</ControlLabel>
          <FormControl onChange={this.getAC} placeholder="18" type="number" value={this.state.ac} />
        </FormGroup>

        {/* Experience */}
        <FormGroup controlId="experience" validationState={this.state.xpValidation}>
          <ControlLabel>Experience</ControlLabel>
          <FormControl
            onChange={this.getXP}
            placeholder="10000"
            type="number"
            value={this.state.xp}
          />
        </FormGroup>
        <hr />
        {/* Tag */}
        <FormGroup controlId="tag" validationState={null}>
          <ControlLabel>
            Tag&nbsp;
            <Label>Optional</Label>
          </ControlLabel>
          <FormControl
            onChange={this.getTag}
            placeholder="Red"
            type="text"
            value={this.state.tag}
          />
          <FormControl.Feedback />
          <HelpBlock>
            Creatures created together share stats and initiative. You can use the same tag for
            multiple creature groups.
          </HelpBlock>
        </FormGroup>

        {/* Number Range */}
        <FormGroup controlId="numLow" validationState={this.state.numValidation}>
          <ControlLabel>
            Number Range&nbsp;<Label>Optional</Label>
          </ControlLabel>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControl
              onChange={this.getNumLow}
              placeholder="1"
              style={{ width: '45%' }}
              type="number"
              value={this.state.numLow}
            />
            <div style={{ marginTop: 5 }}>
              <strong>&ndash;</strong>
            </div>
            <FormControl
              onChange={this.getNumHigh}
              placeholder="10"
              style={{ width: '45%' }}
              type="number"
              value={this.state.numHigh}
            />
          </div>
          <HelpBlock>Include up to 10 numbered creatures within a group</HelpBlock>
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
