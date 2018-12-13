import React, { Component } from 'react';
import AdvantageIcon from './AdvantageIcon';

import { ControlLabel, Button, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

const defaultState = {
  name: '',
  modifier: 0,
  advantage: false,
};

export default class InitiativeForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      modifier: 0,
      advantage: false,
    };
    this.getName = this.getName.bind(this);
    this.getModifier = this.getModifier.bind(this);
    this.getAdvantage = this.getAdvantage.bind(this);
    this.addLocal = this.addLocal.bind(this);
  }
  addLocal() {
    if (this.state.name) {
      let creatures;

      if (localStorage.hasOwnProperty('creatures_dnd')) {
        creatures = localStorage.getItem('creatures_dnd');

        try {
          creatures = JSON.parse(creatures);
          creatures.push(this.state);
          creatures = JSON.stringify(creatures);
          localStorage.setItem('creatures_dnd', creatures);
        } catch (e) {
          console.error('Error:', e);
        }
      } else {
        let creatures = [];
        creatures.push(this.state);
        creatures = JSON.stringify(creatures);
        localStorage.setItem('creatures_dnd', creatures);
      }
      this.setState(defaultState);
    }
  }
  getAdvantage() {
    this.setState({ advantage: this.refs.adv_checkbox.checked });
  }

  getName(e) {
    this.setState({ name: e.target.value });
  }

  getModifier(e) {
    this.setState({ modifier: e.target.value });
  }
  render() {
    return (
      <Form componentClass="fieldset" horizontal>
        {/* Creature Name */}
        <FormGroup controlId="name">
          <ControlLabel>Creature Name</ControlLabel>
          <FormControl onChange={this.getName} type="text" placeholder="Marni Moonfoot" />
        </FormGroup>

        {/* Initiative + Advantage */}
        <FormGroup controlId="initiative">
          <ControlLabel>Initiative Modifier</ControlLabel>
          <InputGroup>
            <FormControl onChange={this.getModifier} type="number" placeholder="5" />
            <InputGroup.Addon>
              <AdvantageIcon />
              <input
                title="Rolls with advantage"
                onChange={this.getAdvantage}
                ref="adv_checkbox"
                type="checkbox"
                aria-label="Advantage?"
              />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        {/* Button */}
        <FormGroup>
          <Button
            onClick={this.addLocal}
            style={{ width: '100%' }}
            type="submit"
            className="btn btn-success"
          >
            Add
          </Button>
        </FormGroup>
      </Form>
    );
  }
}
