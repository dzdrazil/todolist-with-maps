'use strict';

import React, {Component} from 'react';
import {GoogleMaps} from '../maps/GMaps';

import {TodoPlacesProperty, TodoPlacesOriginProperty} from './TodoOptionsStreams';

export default class TodoMap extends Component {
  constructor() {
    this.markers = null;
    this.originMarker = null;
  }

  deleteMarkers() {
    this.markers.forEach(
      marker => marker.setMap(null));
    this.markers.length = 0;
  }

  createMarkers(places) {
    places.toIndexedSeq()
      .toArray()
      .forEach(
        place => {
          if (!place.geometry || !place.geometry.location) {
            return;
          }
          let marker = new GoogleMaps.Marker({
            map: this.mapInstance,
            position: place.geometry.location
          });
          this.markers.push(marker);
        });
  }

  setOrigin(place) {
    if (this.originMarker) {
      this.originMarker.setMap(null);
      this.originMarker = null;
    }

    if (!place) return;

    this.originMarker = new GoogleMaps.Marker({
      map: this.mapInstance,
      position: place.geometry.location
    });
  }

  componentDidMount() {
    this.markers = [];
    this.mapInstance = new GoogleMaps.Map(
      React.findDOMNode(this.refs.mapCanvas),
      {
        zoom: 12,
        center: new GoogleMaps.LatLng(44.8336, -93.3100)
      }
    );

    TodoPlacesProperty.onValue(
      (places) => {
        this.deleteMarkers();
        this.createMarkers(places);
      });

    TodoPlacesOriginProperty.onValue(
      place => this.setOrigin(place));
  }

  render() {
    return (
      <div  id='gmap-canvas' ref="mapCanvas"></div>
    );
  }
}
