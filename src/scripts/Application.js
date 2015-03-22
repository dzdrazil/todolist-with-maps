'use strict';

import React, {Component} from 'react';

import TodoInput from './todo/TodoInputElement';
import TodoList from './todo/TodoListElement';
import TodoMap from './todo/TodoMap';

import {TodoPlacesOriginStream, TodoPlacesAddStream} from './todo/TodoOptionsStreams';

export default class Application extends Component {
  render(){
    return (
      <div>
        <TodoInput label="Place of Origin" outputStream={TodoPlacesOriginStream} />
        <TodoInput label="New Destination Place" outputStream={TodoPlacesAddStream} />
        <TodoMap />
        <TodoList/>
      </div>
    );
  }
}
