'use strict';

import React, {Component} from 'react';

import {TodoPlacesDeleteStream} from './TodoOptionsStreams';

export default class TodoListItemElement extends Component{
  constructor() {
    this.deletePlace = this.deletePlace.bind(this);
  }

  deletePlace() {
    TodoPlacesDeleteStream.emit(this.props.place.place_id);
  }

  render() {
    return (
        <li>
          <span>{this.props.place.name}</span>
          -----
          <span><button onClick={this.deletePlace}>Remove</button></span>
        </li>
      );
  }
}
