import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as a from '../../actions/'
import 'react-toggle/style.css'
import Toggle from 'react-toggle'
import { capitalizeFirstLetter } from '../component.functions'
// Note: Documentation re: ListGroup.Item is wrong.
// https://react-bootstrap.github.io/components/list-group/#list-group-props
// Use `ListGroupItem`
import { ListGroupItem } from 'react-bootstrap'

class ConditionStandard extends Component {
  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
  }
  handleToggle() {
    this.props.toggleCondition(this.props.monster, this.props.val)
  }
  render() {
    return (
      <ListGroupItem>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{capitalizeFirstLetter(this.props.val)}</span>
          <Toggle
            defaultChecked={this.props.monster.conditions[this.props.val]}
            onChange={this.handleToggle}
          />
        </div>
      </ListGroupItem>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  toggleCondition: (creature, condition) => dispatch(a.toggleCondition(creature, condition)),
})

export default connect(
  null,
  mapDispatchToProps
)(ConditionStandard)
