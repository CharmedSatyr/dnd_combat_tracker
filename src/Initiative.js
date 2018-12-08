import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const character = {
  first: 'Marni',
  last: 'Moonfoot',
  initiative: 20,
};

export default class Initiative extends Component {
  render() {
    const characters = [character].map(c => (
      <ListGroupItem header={`${c.first} ${c.last}`}>Initiative: {c.initiative}</ListGroupItem>
    ));
    return <ListGroup>{characters}</ListGroup>;
  }
}
