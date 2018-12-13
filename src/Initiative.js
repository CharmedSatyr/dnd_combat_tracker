import React, { Component } from 'react';

import AdvantageIcon from './AdvantageIcon';
import InitiativeForm from './InitiativeForm';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class Initiative extends Component {
  constructor(props) {
    super(props);
    this.state = { creatures: [] };
  }
  componentWillMount() {
    if (localStorage.hasOwnProperty('creatures_dnd')) {
      let creatures = localStorage.getItem('creatures_dnd');
      console.log('creatures:', creatures);

      try {
        creatures = JSON.parse(creatures);
        this.setState({ creatures });
      } catch (e) {
        console.error('Error:', e);
      }
    }
  }
  render() {
    let creatures;
    if (this.state.creatures.length) {
      creatures = this.state.creatures.map((c, i) => (
        <ListGroupItem key={i} header={`${c.name}`}>
          Initiative Modifier: {c.modifier >= 0 ? `+${c.modifier}` : `${c.modifier}`}&nbsp;
          {c.advantage && <AdvantageIcon />}
        </ListGroupItem>
      ));
    }

    return (
      <div>
        <InitiativeForm />
        {creatures && <ListGroup>{creatures}</ListGroup>}
      </div>
    );
  }
}
