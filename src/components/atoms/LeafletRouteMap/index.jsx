import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { colors, borderRadius, shadows } from '../../../conf/designTokens';

// Fix for default leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons for origin and destination
const createCustomIcon = (color, label) => {
  const html = `
    <div style="
      background-color: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      color: white;
      font-weight: bold;
      font-size: 16px;
      border: 3px solid white;
    ">
      ${label}
    </div>
  `;

  return L.divIcon({
    html,
    iconSize: [32, 32],
    className: 'custom-marker',
  });
};

export default function LeafletRouteMap({ 
  origin = 'São Paulo, SP', 
  destination = 'Rio de Janeiro, RJ',
  height = '300px',
  sx = {} 
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Coordenadas de exemplo (em produção, usar geocoding)
    const originCoords = [
      { name: 'Vitória da Conquista, BA', lat: -14.8615, lng: -40.8442 },
      { name: 'São Paulo, SP', lat: -23.5505, lng: -46.6333 },
      { name: 'Rio de Janeiro, RJ', lat: -22.9068, lng: -43.1729 },
      { name: 'Belo Horizonte, MG', lat: -19.9167, lng: -43.9345 },
      { name: 'Brasília, DF', lat: -15.7795, lng: -47.8797 },
      { name: 'Salvador, BA', lat: -12.9714, lng: -38.5014 },
      { name: 'Fortaleza, CE', lat: -3.7319, lng: -38.5433 },
      { name: 'Recife, PE', lat: -8.0476, lng: -34.8770 },
      { name: 'Manaus, AM', lat: -3.1190, lng: -60.0217 },
      { name: 'Porto Alegre, RS', lat: -30.0331, lng: -51.4101 },
      { name: 'Ilhéus, BA', lat: -14.7886, lng: -39.0499 },
    ];

    const getCoords = (location) => {
      const found = originCoords.find(coord => 
        coord.name.toLowerCase().includes(location.toLowerCase()) ||
        location.toLowerCase().includes(coord.name.split(',')[0].toLowerCase())
      );
      return found || originCoords[0];
    };

    const originData = getCoords(origin);
    const destData = getCoords(destination);

    // Inicializar mapa
    if (map.current) {
      map.current.remove();
    }

    map.current = L.map(mapContainer.current).setView([originData.lat, originData.lng], 4);

    // Tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Marcador de origem
    L.marker([originData.lat, originData.lng], {
      icon: createCustomIcon(colors.success.main, '📍'),
    })
      .addTo(map.current)
      .bindPopup(`<strong>Origem</strong><br>${originData.name}`, { autoClose: false });

    // Marcador de destino
    L.marker([destData.lat, destData.lng], {
      icon: createCustomIcon(colors.error.main, '📌'),
    })
      .addTo(map.current)
      .bindPopup(`<strong>Destino</strong><br>${destData.name}`, { autoClose: false });

    // Linha conectando origem e destino
    const line = L.polyline(
      [[originData.lat, originData.lng], [destData.lat, destData.lng]],
      {
        color: colors.primary.main,
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5',
      }
    ).addTo(map.current);

    // Ajustar zoom para mostrar ambos os pontos
    const group = L.featureGroup([
      L.marker([originData.lat, originData.lng]),
      L.marker([destData.lat, destData.lng]),
    ]);
    map.current.fitBounds(group.getBounds(), { padding: [50, 50] });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [origin, destination]);

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: borderRadius.md,
        border: `1px solid ${colors.neutral[200]}`,
        overflow: 'hidden',
        boxShadow: shadows[1],
        height: height,
        ...sx,
      }}
    >
      <Box
        ref={mapContainer}
        sx={{
          width: '100%',
          height: '100%',
          '& .leaflet-container': {
            borderRadius: borderRadius.md,
          },
          '& .custom-marker': {
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
          },
          '& .leaflet-popup-content': {
            fontSize: '13px',
            fontFamily: '"Roboto", sans-serif',
          },
          '& .leaflet-popup-content strong': {
            color: colors.neutral[800],
          },
          '& .leaflet-control-attribution': {
            fontSize: '10px',
          },
        }}
      />
    </Box>
  );
}
