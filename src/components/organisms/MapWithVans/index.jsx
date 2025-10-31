import { useState, useEffect } from "react";
import LeafletMap from "../../atoms/LeafletMap";
import VanMarker from "../../atoms/VanMarker";
import RoutePolyline from "../../molecules/RoutePolyline";
import { getTripsNearby } from "../../../api/trip";
import { useAuth } from "../../../hooks/useAuth";

const MapWithVans = ({ userLocation, selectedTrip, onVanClick }) => {
  const { token } = useAuth();
  const [mapCenter, setMapCenter] = useState(
    userLocation || [-14.8631, -40.8444]
  );
  const [nearbyTrips, setNearbyTrips] = useState([]);

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  useEffect(() => {
    if (!token) return;

    const fetchNearbyTrips = async () => {
      try {
        const res = await getTripsNearby(mapCenter[0], mapCenter[1], token);
        if (res.success) {
          setNearbyTrips(res.data);
        }
      } catch (err) {
        console.error("Erro ao buscar trips próximas:", err);
      }
    };

    fetchNearbyTrips();
  }, [mapCenter]);

  const getRouteCoordinates = (trip) => {
    if (!trip) return { start: null, end: null };
    const start = [
      Number(trip.route.start_latitude),
      Number(trip.route.start_longitude),
    ];
    const end = [
      Number(trip.route.end_latitude),
      Number(trip.route.end_longitude),
    ];
    return { start, end };
  };

  const { start: routeStart, end: routeEnd } = selectedTrip
    ? getRouteCoordinates(selectedTrip)
    : { start: null, end: null };

  return (
    <LeafletMap center={mapCenter} zoom={selectedTrip ? 10 : 13}>
      {!selectedTrip &&
        nearbyTrips?.map((trip) => (
          <VanMarker
            key={trip.id}
            position={[
              Number(trip.route.start_latitude),
              Number(trip.route.start_longitude),
            ]}
            vanInfo={trip}
            isSelected={false}
            onClick={onVanClick}
          />
        ))}

      {selectedTrip && (
        <>
          <RoutePolyline start={routeStart} end={routeEnd} color="#3B82F6" />

          <VanMarker
            position={routeStart}
            vanInfo={{ ...selectedTrip, point: "start" }}
            isSelected={true}
            onClick={onVanClick}
          />

          <VanMarker
            position={routeEnd}
            vanInfo={{ ...selectedTrip, point: "end" }}
            isSelected={true}
            onClick={onVanClick}
          />
        </>
      )}
    </LeafletMap>
  );
};

export default MapWithVans;
