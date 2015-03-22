'use strict';

import Kefir from 'kefir';
import {Map as ImmutableMap} from 'immutable';
import {DirectionsRequest} from '../maps/GMaps';

export const TodoPlacesOriginStream = Kefir.emitter();
export const TodoPlacesOriginProperty = TodoPlacesOriginStream
  .toProperty(null);

export const TodoPlacesAddStream = Kefir.emitter();

export const TodoPlacesDeleteStream = Kefir.emitter();

export const TodoPlacesProperty = Kefir
  .fromBinder(function(emitter) {
    let placesMap = new ImmutableMap();

    function addPlace(place) {
      placesMap = placesMap.set(place.place_id, place);
      emitter.emit(placesMap);
    }

    function deletePlace(placeId) {
      placesMap = placesMap.delete(placeId);
      emitter.emit(placesMap);
    }

    TodoPlacesAddStream.onValue(addPlace);

    TodoPlacesDeleteStream.onValue(deletePlace);

    return function() {
      TodoPlacesAddStream.offValue(addPlace);
      TodoPlacesDeleteStream.offValue(deletePlace);
    };
  })
  .toProperty(new ImmutableMap());

export let TodoPlacesSortedByDistance = Kefir
  .combine(
    [TodoPlacesOriginStream, TodoPlacesProperty],
    function(origin, placesMap) {
      return {origin, placesMap};
    }
  )
  .flatMapLatest(function(combinedPlaces) {
    return Kefir.fromCallback(function(callback) {
      if (!combinedPlaces.origin) return {};
      if (!combinedPlaces.placesMap.size) return {};

      DirectionsRequest(
        combinedPlaces.origin.geometry.location,
        combinedPlaces.placesMap.toArray().map(
          place => place.geometry.location),
        callback);
    });
  });

