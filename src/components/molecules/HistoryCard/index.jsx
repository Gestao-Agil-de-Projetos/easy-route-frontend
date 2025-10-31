import { Box } from "@mui/material";
import PriceBadge from "../../atoms/PriceBadge";
import RouteText from "../../atoms/RouteText";

const HistoryCard = ({ from, to, date, price, onClick, status }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        padding: "8px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box>
        <RouteText
          sx={{
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#000000",
            marginBottom: "4px",
          }}
        >
          {from} → {to}
        </RouteText>
        <RouteText
          sx={{
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#6B7280",
          }}
        >
          {status} - {date}
        </RouteText>
      </Box>
      <PriceBadge price={price} />
    </Box>
  );
};

export default HistoryCard;
