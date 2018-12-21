import React, { Component } from 'react'
import { AdvantageIcon } from '../Icons'
import { saveLocal } from '../localStorage.functions'
import { setID } from '../component.functions'
import Creature from '../../constants/creature'

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
    this.getStats = this.getStats.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
  }
  getStats(e) {
    switch (e.currentTarget.id) {
      case 'name':
        this.setState({ name: e.target.value })
        break
      case 'advantage':
        this.setState({ advantage: !this.state.advantage })
        break
      case 'modifier':
        this.setState({ modifier: e.target.value })
        break
      case 'hit-points':
        this.setState({ hp: e.target.value })
        break
      case 'armor-class':
        this.setState({ ac: e.target.value })
        break
      case 'experience':
        this.setState({ xp: e.target.value })
        break
      case 'tag':
        this.setState({ tag: e.target.value })
        break
      case 'numLow':
        this.setState({ numLow: e.target.value })
        break
      case 'numHigh':
        this.setState({ numHigh: e.target.value })
        break
      default:
        break
    }
  }
  getValidationState(e) {
    e.preventDefault()
    const { name, modifier, hp, ac, xp, numHigh, numLow } = this.state

    // If there is no number range, OR both numbers are filled in and are valid
    let validNum = false
    if (
      (!numHigh && !numLow) ||
      (numHigh && numLow && numLow < numHigh && numLow > 0 && numHigh - numLow <= 10)
    ) {
      // Valid num
      validNum = true
    }

    // Required inputs
    this.setState({
      nameValidation: name ? 'success' : 'error',
      modValidation: modifier ? 'success' : 'error',
      hpValidation: hp ? 'success' : 'error',
      acValidation: ac ? 'success' : 'error',
      xpValidation: xp ? 'success' : 'error',
      numValidation: validNum ? 'success' : 'warning',
    })

    if (name && modifier && ac && hp && xp && validNum) {
      this.addMonsters()
    }
  }
  addMonsters() {
    const { name, modifier, advantage, ac, hp, xp, tag, numHigh, numLow } = this.state
    const monsters = []
    for (let i = numLow || 0; i <= (numHigh || 0); i++) {
      const monster = new Creature(
        name,
        modifier,
        advantage,
        ac,
        hp,
        xp,
        tag,
        i,
        `monster-${setID()}`,
        setID()
      )
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
            onChange={this.getStats}
            placeholder="Beholder"
            type="text"
            value={this.state.name}
          />
          <FormControl.Feedback />
        </FormGroup>
        {/* Initiative Modifier */}
        <FormGroup validationState={this.state.modValidation}>
          <ControlLabel>Initiative Modifier</ControlLabel>
          <InputGroup>
            <FormControl
              id="modifier"
              onChange={this.getStats}
              placeholder="2"
              type="number"
              value={this.state.modifier}
            />

            {/* Advantage */}
            <InputGroup.Addon>
              <AdvantageIcon />
              <input
                aria-label="Roll initiative with advantage"
                onChange={this.getStats}
                id="advantage"
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
            onChange={this.getStats}
            placeholder="180"
            type="number"
            value={this.state.hp}
          />
        </FormGroup>

        {/* Armor Class */}
        <FormGroup controlId="armor-class" validationState={this.state.acValidation}>
          <ControlLabel>Armor Class</ControlLabel>
          <FormControl
            onChange={this.getStats}
            placeholder="18"
            type="number"
            value={this.state.ac}
          />
        </FormGroup>

        {/* Experience */}
        <FormGroup controlId="experience" validationState={this.state.xpValidation}>
          <ControlLabel>Experience</ControlLabel>
          <FormControl
            onChange={this.getStats}
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
            onChange={this.getStats}
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
        <FormGroup validationState={this.state.numValidation}>
          <ControlLabel>
            Number Range&nbsp;<Label>Optional</Label>
          </ControlLabel>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControl
              id="numLow"
              onChange={this.getStats}
              placeholder="1"
              style={{ width: '45%' }}
              type="number"
              value={this.state.numLow}
            />
            <div style={{ marginTop: 5 }}>
              <strong>&ndash;</strong>
            </div>
            <FormControl
              id="numHigh"
              onChange={this.getStats}
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
