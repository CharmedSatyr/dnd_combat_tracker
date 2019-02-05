import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as a from '../../actions/'
// Note: Documentation re: ListGroup.Item is wrong.
// https://react-bootstrap.github.io/components/list-group/#list-group-props
// Use `ListGroupItem`
import { Button, ButtonGroup, ListGroupItem } from 'react-bootstrap'

class ConditionExhaustion extends Component {
  constructor(props) {
    super(props)
    this.state = { active: 0 }
    this.handleSet = this.handleSet.bind(this)
  }
  handleSet(newLevel) {
    this.setState({ active: newLevel })
    this.props.setExhaustionLevel(this.props.monster, newLevel)
  }
  componentWillMount() {
    this.setState({ active: this.props.monster.conditions.exhaustion.level })
  }
  render() {
    const buttons = [0, 1, 2, 3, 4, 5, 6].map(b => (
      <Button
        key={b}
        variant="secondary"
        active={this.state.active === b}
        onClick={() => this.handleSet(b)}
      >
        {b !== 0 ? b : '--'}
      </Button>
    ))
    return (
      <ListGroupItem>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <span>Exhaustion</span>
          <ButtonGroup aria-label="exhaustion control">{buttons}</ButtonGroup>
        </div>
      </ListGroupItem>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setExhaustionLevel: (creature, level) => dispatch(a.setExhaustionLevel(creature, level)),
})

export default connect(
  null,
  mapDispatchToProps
)(ConditionExhaustion)
