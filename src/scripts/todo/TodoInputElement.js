'use strict';

import React, {Component} from 'react';
import {GoogleMaps} from '../maps/GMaps';

class TodoInputElement extends Component {
  constructor() {
    this.state = {inputValue: ''};
  }

  componentDidMount() {
    this.autocomplete = new GoogleMaps.places.Autocomplete(
      React.findDOMNode(this.refs.todoInput)
    );

    GoogleMaps.event.addListener(this.autocomplete, 'place_changed', () => {
      let place = this.autocomplete.getPlace();

      this.props.outputStream.emit(place);
      React.findDOMNode(this.refs.todoInput).value = '';
    });
  }

  render(){
    return (
      <div>
        <label htmlFor="todo-input">{this.props.label}</label><br/>
        <input name="todo-input" ref="todoInput" /><br/>
      </div>
    );
  }
}

TodoInputElement.propTypes = {
  outputStream: React.PropTypes.object.isRequred,
  label: React.PropTypes.string.isRequired
};

export default TodoInputElement;
