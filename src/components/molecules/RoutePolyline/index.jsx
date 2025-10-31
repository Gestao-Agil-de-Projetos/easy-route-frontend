import { Polyline, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { fetchRoute } from '../../../api/routes';

const RoutePolyline = ({ start, end, color = '#3B82F6' }) => {
  const map = useMap();
  const [routePositions, setRoutePositions] = useState([]);

  useEffect(() => {
    if (!start || !end) {
      setRoutePositions([]);
      return;
    }

    const loadRoute = async () => {
      try {
        const data = await fetchRoute(start, end);
        
        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates;
          const positions = coords.map(coord => [coord[1], coord[0]]);
          setRoutePositions(positions);
          
          const bounds = L.latLngBounds(positions);
          map.fitBounds(bounds, { padding: [100, 100] });
        }
      } catch (error) {
        setRoutePositions([start, end]);
        const bounds = L.latLngBounds([start, end]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    loadRoute();
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
