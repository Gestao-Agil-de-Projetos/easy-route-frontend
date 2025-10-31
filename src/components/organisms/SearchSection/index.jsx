import { Box } from "@mui/material";
import SearchBar from "../../molecules/SearchBar";
import DatePickerDialog from "../../atoms/DatePickerDialog";
import SearchDropdown from "../../molecules/SearchDropdown";
import { useState } from "react";
import { formatDisplayDate, parseToDate, toISODate } from "../../../utils/date";

const SearchSection = ({ onSearchChange, availableTrips, onTripSelect }) => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [selectedDateDisplay, setSelectedDateDisplay] = useState("Hoje"); // o que aparece
  const [selectedDateISO, setSelectedDateISO] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const triggerSearch = (
    from = fromValue,
    to = toValue,
    dateISO = selectedDateISO
  ) => {
    if (onSearchChange) {
      onSearchChange({ from, to, date: dateISO });
    }
  };

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFromValue(value);
    setShowDropdown(value.trim() !== "" || toValue.trim() !== "");
    triggerSearch(value, toValue);
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setToValue(value);
    setShowDropdown(fromValue.trim() !== "" || value.trim() !== "");
    triggerSearch(fromValue, value);
  };

  const handleDateSelect = (dateInput) => {
    const selected = parseToDate(dateInput);
    const display = formatDisplayDate(selected);
    const isoDate = toISODate(selected);

    setSelectedDateDisplay(display);
    setSelectedDateISO(isoDate);
    triggerSearch(fromValue, toValue, isoDate);
  };

  const handleFromLocationClick = async () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`
          );
          const data = await response.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.municipality ||
            "Local atual";

          setFromValue(city);
          setShowDropdown(true);
          triggerSearch(city, toValue);
        } catch (err) {
          console.error("Erro ao buscar localização:", err);
        }
      },
      (error) => {
        console.error("Erro ao obter geolocalização:", error);
        alert("Não foi possível obter sua localização.");
      }
    );
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow:
            "0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          borderRadius: "16px",
          padding: { xs: "16px", sm: "20px", md: "24px" },
        }}
      >
        <SearchBar
          fromValue={fromValue}
          toValue={toValue}
          selectedDate={selectedDateDisplay}
          onFromChange={handleFromChange}
          onToChange={handleToChange}
          onDateSelect={() => setDatePickerOpen(true)}
          onFromLocationClick={handleFromLocationClick}
        />
      </Box>

      <SearchDropdown
        trips={availableTrips}
        onTripSelect={(trip) => {
          setShowDropdown(false);
          onTripSelect && onTripSelect(trip);
        }}
        isVisible={showDropdown}
      />

      <DatePickerDialog
        open={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        selectedDate={selectedDateDisplay}
        onSelectDate={handleDateSelect}
      />
    </Box>
  );
};

export default SearchSection;
