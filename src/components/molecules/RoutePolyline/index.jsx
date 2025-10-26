import { Polyline, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const RoutePolyline = ({ start, end, color = '#3B82F6' }) => {
  const map = useMap();
  const [routePositions, setRoutePositions] = useState([]);

  useEffect(() => {
    if (!start || !end) {
      setRoutePositions([]);
      return;
    }

    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates;
          const positions = coords.map(coord => [coord[1], coord[0]]);
          setRoutePositions(positions);
          
          const bounds = L.latLngBounds(positions);
          map.fitBounds(bounds, { padding: [100, 100] });
        }
      } catch (error) {
        console.error('Erro ao buscar rota:', error);
        setRoutePositions([start, end]);
        const bounds = L.latLngBounds([start, end]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    fetchRoute();
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
