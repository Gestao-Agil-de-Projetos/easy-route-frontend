import { Polyline, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const RoutePolyline = ({ start, end, color = '#3B82F6' }) => {
  const map = useMap();
  const [routePositions, setRoutePositions] = useState([start, end]);

  useEffect(() => {
    if (!start || !end) {
      setRoutePositions([]);
      return;
    }

    setRoutePositions([start, end]);
    
    if (map) {
      const bounds = L.latLngBounds([start, end]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [start, end, map]);

  if (!routePositions || routePositions.length === 0) {
    return null;
  }

  return (
    <Polyline
      positions={routePositions}
      pathOptions={{
        color: color,
        weight: 5,
        opacity: 0.8,
        dashArray: '10, 10',
        lineCap: 'round',
      }}
    />
  );
};

export default RoutePolyline;
