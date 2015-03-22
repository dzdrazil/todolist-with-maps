'use strict';

import React, {Component} from 'react';

import {TodoPlacesOriginStream, TodoPlacesProperty} from './TodoOptionsStreams';
import TodoListItemElement from './TodoListItemElement';
import {Map as ImmutableMap} from 'immutable';

export default class TodoListElement extends Component{
  constructor() {
    this.state = {
      originPlace: null,
      places: new ImmutableMap({})
    };

    this.originProperty = TodoPlacesOriginStream.toProperty(null);

    this.setPlaces = this.setPlaces.bind(this);
    this.setOrigin = this.setOrigin.bind(this);
  }

  setPlaces(places) {
    this.setState({places});
  }

  setOrigin(originPlace) {
    this.setState({originPlace});
  }

  componentDidMount() {
    TodoPlacesProperty.onValue(this.setPlaces);
    this.originProperty.onValue(this.setOrigin);
  }

  createPlaceElements(places) {
    return places.toIndexedSeq()
      .toArray()
      .map(
        place => (<TodoListItemElement key={place.place_id} place={place}></TodoListItemElement>));
  }

  createOriginElement(place) {
    return (
      <div>
        {place ? place.name : 'No origin set'}
      </div>
    );
  }

  render() {
    return (
      <section>
        <h2>Origin</h2>
        {this.createOriginElement(this.state.originPlace)}
        <h2>Destinations</h2>
        <ul>
          {this.createPlaceElements(this.state.places)}
        </ul>
      </section>
    );
  }
}
