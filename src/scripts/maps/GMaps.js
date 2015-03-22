'use strict';

import {maps} from 'google-maps';

export let GoogleMaps = maps;

let _directionsService =  new GoogleMaps.DirectionsService();

export let DirectionsRequest = function(origin, destinations, callback) {
  _directionsService.route({
    origin: origin,
    destination: origin,
    waypoints: destinations.map(
      destination => {return {location: destination, stopover: true};}),
    travelMode: GoogleMaps.TravelMode.DRIVING,
    unitSystem : GoogleMaps.UnitSystem.IMPERIAL,
    optimizeWaypoints: true
  }, callback);
};
