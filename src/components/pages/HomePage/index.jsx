import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../organisms/Header";
import SearchSection from "../../organisms/SearchSection";
import MapWithVans from "../../organisms/MapWithVans";
import TripConfirmationCard from "../../molecules/TripConfirmationCard";
import ExpandableReservations from "../../organisms/ExpandableReservations";
import {
  createBooking,
  getBookings,
  getLatestBookingWithoutAssessment,
} from "../../../api/booking";
import { getTripsByCoordinates } from "../../../api/trip";
import { useAuth } from "../../../hooks/useAuth";
import RouteSnackBar from "../../atoms/RouteSnackBar";
import { jwtDecode } from "jwt-decode";
import { calcularDistanciaEmKm } from "../../../utils";
import { calcularDuracao } from "../../../utils/date";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState({
    from: "",
    to: "",
    date: "Hoje",
  });
  const [userLocation, setUserLocation] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [availableTrips, setAvailableTrips] = useState([]);
  const [reservationsExpanded, setReservationsExpanded] = useState(false);
  const [showLastTrip, setShowLastTrip] = useState(true);

  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [reservations, setReservation] = useState([]);
  const [lastTrip, setLastTrip] = useState([]);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSearchChange = async (query) => {
    setSearchQuery(query);

    const { from, to, date } = query;
    if (!from || !to || !date) return;

    try {
      const trips = await getTripsByCoordinates(from, to, date, token);
      setAvailableTrips(trips.data || []);
    } catch (error) {
      console.error("Erro ao buscar viagens:", error);
      setAvailableTrips([]);
    }
  };

  useEffect(() => {
    if (!token) return;

    const mapBookingToUI = (booking, isHistory = false) => {
      const dateObj = new Date(booking.trip?.start_time ?? new Date());
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");
      const time = `${hours}:${minutes}`;
      const today = new Date();

      return {
        from: booking.trip?.route?.start_name || "",
        to: booking.trip?.route?.end_name || "",
        date:
          dateObj.getFullYear() === today.getFullYear() &&
          dateObj.getMonth() === today.getMonth() &&
          dateObj.getDate() === today.getDate()
            ? "Hoje"
            : `${String(dateObj.getDate()).padStart(2, "0")}/${String(
                dateObj.getMonth() + 1
              ).padStart(2, "0")}`,
        time: time || "00:00",
        price: booking.trip?.price ? `R$ ${booking.trip.price}` : "R$ --",
        driver: booking.trip?.route?.van?.owner_id || "Motorista",
        timeBadge: "0h",
        variant: isHistory ? "grey" : "red",
        review: { rating: 0, text: "" },
        status:
          isHistory && booking.status === "FINISHED"
            ? "Finalizada"
            : "Cancelada",
      };
    };

    const mapLastBookingToUI = (booking) => {
      if (!booking?.trip?.start_time) return null;

      const dateObj = new Date(booking.trip.start_time);
      const hours = String(dateObj.getHours()).padStart(2, "0");

      setShowLastTrip(true);

      return {
        from: booking.trip.route?.start_name || "",
        to: booking.trip.route?.end_name || "",
        date: `${String(dateObj.getDate()).padStart(2, "0")}/${String(
          dateObj.getMonth() + 1
        )} - ${hours}`,
        driver: booking.trip.route.van.owner.name,
        price: booking.trip?.price ? `R$ ${booking.trip.price}` : "R$ --",
        distance: calcularDistanciaEmKm(
          booking.trip.route.start_latitude,
          booking.trip.route.start_longitude,
          booking.trip.route.end_latitude,
          booking.trip.route.end_longitude
        ).toFixed(2),
        estimated_time: calcularDuracao(
          booking.trip.start_time,
          booking.trip.estimated_end_time
        ),
      };
    };

    const fetchReservations = async () => {
      try {
        const historyData = await getBookings("CANCELLED,FINISHED", token);
        const reservationData = await getBookings("PENDING,CONFIRMED", token);

        const formattedHistory = (historyData.data || []).map((b) =>
          mapBookingToUI(b, true)
        );
        const formattedReservations = (reservationData.data || []).map((b) =>
          mapBookingToUI(b, false)
        );

        const lastTrip = await getLatestBookingWithoutAssessment(token);

        let formattedLastTrip = null;
        if (lastTrip?.data) {
          formattedLastTrip = mapLastBookingToUI(lastTrip.data);
        }

        setHistory(formattedHistory || []);
        setReservation(formattedReservations || []);
        setLastTrip(formattedLastTrip || {});
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
      }
    };

    fetchReservations();
  }, [token]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setUserLocation([-14.8631, -40.8444]);
        }
      );
    } else {
      setUserLocation([-14.8631, -40.8444]);
    }
  }, []);

  const handleTripSelect = (trip) => setSelectedTrip(trip);
  const handleConfirmTrip = async (trip) => {
    try {
      const decoded = jwtDecode(token);

      const bookingData = {
        userId: decoded.id,
        tripId: trip.id,
        stopPoint: {
          latitude: userLocation ? userLocation[0] : trip.route.start_latitude,
          longitude: userLocation
            ? userLocation[1]
            : trip.route.start_longitude,
          description: `Ponto de parada usuario ${decoded.id}`,
        },
      };

      const response = await createBooking(bookingData, token);

      setSnack({
        open: true,
        message: "Reserva realizada com sucesso.",
        severity: "success",
      });
      setSelectedTrip(null);
    } catch (err) {
      setSnack({
        open: true,
        message:
          err.response?.data?.message ||
          err.message ||
          "Erro ao confirmar reserva. Tente novamente mais tarde",
        severity: "error",
      });
    }
  };
  const handleCancelTrip = () => setSelectedTrip(null);
  const handleLogoClick = () => {
    setSelectedTrip(null);
    setSearchQuery({ from: "", to: "", date: "Hoje" });
    setAvailableTrips([]);
  };
  const handleReviewComplete = () => {
    setShowLastTrip(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {userLocation && (
        <MapWithVans
          userLocation={userLocation}
          selectedTrip={selectedTrip}
          onVanClick={handleTripSelect}
        />
      )}

      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999 }}>
        <Header onLogoClick={handleLogoClick} />
      </Box>

      {!selectedTrip && (
        <Box
          sx={{
            position: "fixed",
            top: { xs: "90px", sm: "100px" },
            left: "50%",
            transform: "translateX(-50%)",
            width: { xs: "95%", sm: "90%" },
            maxWidth: "900px",
            maxHeight: { xs: "calc(100vh - 100px)", sm: "calc(100vh - 120px)" },
            overflowY: "auto",
            zIndex: 1000,
            paddingBottom: { xs: "20px", sm: "24px" },
          }}
        >
          <SearchSection
            onSearchChange={handleSearchChange}
            availableTrips={availableTrips}
            onTripSelect={handleTripSelect}
          />

          <ExpandableReservations
            reservations={reservations}
            history={history}
            isExpanded={reservationsExpanded}
            onToggle={() => setReservationsExpanded(!reservationsExpanded)}
            lastTrip={showLastTrip ? lastTrip : null}
            onReviewComplete={handleReviewComplete}
          />
        </Box>
      )}

      {selectedTrip && (
        <TripConfirmationCard
          trip={selectedTrip}
          onConfirm={handleConfirmTrip}
          onCancel={handleCancelTrip}
        />
      )}

      <RouteSnackBar
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={() => setSnack({ ...snack, open: false })}
      />
    </Box>
  );
};

export default HomePage;
