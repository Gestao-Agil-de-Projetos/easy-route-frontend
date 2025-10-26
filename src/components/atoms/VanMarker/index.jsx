import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const vanIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const selectedVanIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  `),
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

const VanMarker = ({ position, vanInfo, isSelected, onClick }) => {
  const icon = isSelected ? selectedVanIcon : vanIcon;

  return (
    <Marker 
      position={position} 
      icon={icon}
      eventHandlers={{
        click: () => onClick && onClick(vanInfo)
      }}
    >
      <Popup>
        <div style={{ padding: '8px' }}>
          <strong>{vanInfo.from} → {vanInfo.to}</strong>
          <br />
          <span style={{ fontSize: '14px', color: '#6B7280' }}>
            Motorista: {vanInfo.driver}
          </span>
          <br />
          <span style={{ fontSize: '14px', color: '#6B7280' }}>
            Preço: {vanInfo.price}
          </span>
          <br />
          <span style={{ fontSize: '14px', color: '#6B7280' }}>
            Horário: {vanInfo.time}
          </span>
        </div>
      </Popup>
    </Marker>
  );
};

export default VanMarker;
