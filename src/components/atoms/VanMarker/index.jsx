import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuttleVan } from "@fortawesome/free-solid-svg-icons";

// Função para renderizar o Van dentro do Pin
const vanIconSVG = (pinColor, iconColor, iconSize = 18) =>
  `
  <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
      </filter>
    </defs>
    <path d="M24 0C14 0 6 8 6 18c0 12 18 30 18 30s18-18 18-30C42 8 34 0 24 0z"
      fill="${pinColor}" filter="url(#shadow)"/>
    <foreignObject x="13" y="10" width="22" height="22">
      <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;justify-content:center;align-items:center;width:22px;height:22px;">
        ${renderFontAwesomeBase64(faShuttleVan, iconColor, iconSize)}
      </div>
    </foreignObject>
  </svg>
`;

const renderFontAwesomeBase64 = (icon, color, size) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.icon[0]} ${icon.icon[1]}" width="${size}" height="${size}">
      <path fill="${color}" d="${icon.icon[4]}"/>
    </svg>
  `;
  return svg;
};

const createVanIcon = (pinColor, iconColor, size = 48) =>
  new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(vanIconSVG(pinColor, iconColor, size * 0.4)),
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });

const defaultIcon = createVanIcon("#3B82F6", "white", 48);

const selectedIcon = createVanIcon("#10B981", "white", 60);

const VanMarker = ({ position, vanInfo, isSelected, onClick }) => {
  const icon = isSelected ? selectedIcon : defaultIcon;

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{ click: () => onClick?.(vanInfo) }}
    >
      <Popup>
        <div style={{ padding: "8px" }}>
          <strong>{vanInfo.from} → {vanInfo.to}</strong><br/>
          <span style={{ fontSize: "14px", color: "#6B7280" }}>
            Motorista: {vanInfo.driver}
          </span><br/>
          <span style={{ fontSize: "14px", color: "#6B7280" }}>
            Preço: {vanInfo.price}
          </span><br/>
          <span style={{ fontSize: "14px", color: "#6B7280" }}>
            Horário: {vanInfo.time}
          </span>
        </div>
      </Popup>
    </Marker>
  );
};

export default VanMarker;
