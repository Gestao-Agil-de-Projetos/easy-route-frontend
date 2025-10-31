import { useState, useEffect } from 'react';
import LeafletMap from '../../atoms/LeafletMap';
import VanMarker from '../../atoms/VanMarker';
import RoutePolyline from '../../molecules/RoutePolyline';

const MapWithVans = ({ userLocation, vans, selectedTrip, onVanClick }) => {
  const [mapCenter, setMapCenter] = useState(userLocation || [-14.8631, -40.8444]);

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  const getVanPosition = (van, index) => {
    if (van.position) {
      return van.position;
    }
    
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;
    
    return [
      mapCenter[0] + latOffset,
      mapCenter[1] + lngOffset,
    ];
  };

  const getRouteCoordinates = (trip) => {
    if (!trip) return { start: null, end: null };

    const cityCoordinates = {
      'BRUMADO': [-14.2031, -41.6656],
      'VCA': [-14.8631, -40.8444],
      'POÇÕES': [-14.5219, -40.3653],
      'BARRA': [-11.0889, -43.1417],
      'ITABUNA': [-14.7858, -39.2797],
    };

    const start = cityCoordinates[trip.from] || mapCenter;
    const end = cityCoordinates[trip.to] || mapCenter;

    return { start, end };
  };

  const { start: routeStart, end: routeEnd } = selectedTrip ? getRouteCoordinates(selectedTrip) : { start: null, end: null };
  const selectedVanPosition = selectedTrip ? getVanPosition(selectedTrip, 0) : null;

  return (
    <LeafletMap center={mapCenter} zoom={selectedTrip ? 10 : 13}>
      {/* Mostrar marcadores de vans */}
      {!selectedTrip && vans && vans.map((van, index) => (
        <VanMarker
          key={index}
          position={getVanPosition(van, index)}
          vanInfo={van}
          isSelected={false}
          onClick={onVanClick}
        />
      ))}

      {/* Mostrar rota e van selecionada */}
      {selectedTrip && (
        <>
          <RoutePolyline start={routeStart} end={routeEnd} color="#3B82F6" />
          <VanMarker
            position={selectedVanPosition}
            vanInfo={selectedTrip}
            isSelected={true}
            onClick={onVanClick}
          />
        </>
      )}
    </LeafletMap>
  );
};

export default MapWithVans;
