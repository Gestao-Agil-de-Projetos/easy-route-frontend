import { Box, Collapse, IconButton } from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReservationCard from "../../molecules/ReservationCard";
import HistoryCard from "../../molecules/HistoryCard";
import ViewReviewDialog from "../../molecules/ViewReviewDialog";
import StarRating from "../../atoms/StarRating";
import ReviewPromptDialog from "../../molecules/ReviewPromptDialog";
import ReviewDialog from "../../molecules/ReviewDialog";
import RouteText from "../../atoms/RouteText";
import { useState } from "react";

const ExpandableReservations = ({
  reservations,
  history,
  isExpanded,
  onToggle,
  lastTrip,
  onReviewComplete,
  token,
  onShowSnack
}) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showReviewTextDialog, setShowReviewTextDialog] = useState(false);

  const handleHistoryClick = (trip) => {
    if (trip.review) {
      setSelectedTrip(trip);
      setShowReviewDialog(true);
    }
  };

  const handleCloseReviewDialog = () => {
    setShowReviewDialog(false);
    setSelectedTrip(null);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setShowPrompt(true);
  };

  const handlePromptAccept = () => {
    setShowPrompt(false);
    setShowReviewTextDialog(true);
  };

  const handlePromptDecline = () => {
    setShowPrompt(false);
    onReviewComplete && onReviewComplete({ rating, text: "" });
  };

  const handleReviewSubmit = () => {
    onReviewComplete && onReviewComplete();
    setShowReviewTextDialog(false);
    setShowPrompt(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          onClick={onToggle}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(5px)",
            borderRadius: "12px",
            padding: { xs: "10px 16px", sm: "12px 20px" },
            marginTop: "12px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow:
              "0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              transform: "translateY(-2px)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <RouteText
            sx={{
              fontWeight: 600,
              fontSize: { xs: "14px", sm: "16px" },
              color: "#1F2937",
            }}
          >
            Minhas Viagens
          </RouteText>
          <IconButton size="small" sx={{ padding: { xs: "4px", sm: "8px" } }}>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </IconButton>
        </Box>

        {lastTrip && Object.keys(lastTrip).length > 0 && (
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow:
                "0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              borderRadius: "16px",
              padding: { xs: "16px", sm: "20px", md: "24px" },
              marginTop: "8px",
              position: "relative",
            }}
          >
            <RouteText
              sx={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#1F2937",
                marginBottom: { xs: 2, sm: 2.5 },
              }}
            >
              Avalie Sua Última Viagem
            </RouteText>

            <Box sx={{ marginBottom: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  marginBottom: 0.5,
                }}
              >
                <RouteText
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "28px",
                    color: "#1F2937",
                  }}
                >
                  {lastTrip.from}
                </RouteText>
                <RouteText sx={{ color: "#9CA3AF", fontSize: "18px" }}>
                  →
                </RouteText>
                <RouteText
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "28px",
                    color: "#1F2937",
                  }}
                >
                  {lastTrip.to}
                </RouteText>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <RouteText
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#4B5563",
                  }}
                >
                  {lastTrip.distance}
                </RouteText>
                <RouteText
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#6B7280",
                  }}
                >
                  Km
                </RouteText>
                <RouteText
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#4B5563",
                  }}
                >
                  ~{lastTrip.estimated_time}
                </RouteText>
              </Box>
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: { xs: "20px", sm: "24px", md: "27px" },
                right: { xs: "16px", sm: "20px", md: "24px" },
                display: "flex",
                gap: 0.5,
              }}
            >
              <StarRating
                rating={rating}
                onRate={handleRatingChange}
                size={24}
              />
            </Box>

            <Box
              sx={{
                marginTop: { xs: 2, sm: 3 },
                paddingTop: { xs: 2, sm: 3 },
                borderTop: "1px solid rgba(209, 213, 219, 0.6)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 2,
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <RouteText
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#6B7280",
                  }}
                >
                  {lastTrip.date}
                </RouteText>
                <RouteText
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#1F2937",
                  }}
                >
                  {lastTrip.price}
                </RouteText>
                <Box
                  sx={{
                    padding: "2px 8px",
                    backgroundColor: "#DBEAFE",
                    borderRadius: "9999px",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <RouteText
                    sx={{
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#1D4ED8",
                    }}
                  >
                    PIX
                  </RouteText>
                </Box>
              </Box>

              <Box
                sx={{
                  padding: "6px 12px",
                  backgroundColor: "#3B82F6",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <RouteText
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  {lastTrip.driver}
                </RouteText>
              </Box>
            </Box>
          </Box>
        )}

        <Collapse in={isExpanded}>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(5px)",
              borderRadius: "12px",
              padding: { xs: "16px", sm: "20px", md: "24px" },
              marginTop: "8px",
              boxShadow:
                "0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 2, sm: 3 },
              }}
            >
              <Box>
                <RouteText
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#6B7280",
                    marginBottom: 1.5,
                  }}
                >
                  Reservas
                </RouteText>
                <Box
                  sx={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    paddingRight: "8px",
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#D1D5DB",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    {reservations.map((reservation, index) => (
                      <ReservationCard key={index} {...reservation} />
                    ))}
                    {reservations.length === 0 && (
                      <Box sx={{ padding: "48px 24px", textAlign: "center" }}>
                        <RouteText sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                          Você não tem reservas ativas
                        </RouteText>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box>
                <RouteText
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#6B7280",
                    marginBottom: 1.5,
                  }}
                >
                  Histórico
                </RouteText>
                <Box
                  sx={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    paddingRight: "8px",
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#D1D5DB",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    {history.map((item, index) => (
                      <HistoryCard
                        key={index}
                        {...item}
                        onClick={() => handleHistoryClick(item)}
                      />
                    ))}
                    {history.length === 0 && (
                      <Box sx={{ padding: "48px 24px", textAlign: "center" }}>
                        <RouteText sx={{ color: "#9CA3AF", fontSize: "14px" }}>
                          Você não tem viagens no histórico
                        </RouteText>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>

      <ReviewPromptDialog
        open={showPrompt}
        onClose={handlePromptDecline}
        onAccept={handlePromptAccept}
        onDecline={handlePromptDecline}
      />

      <ReviewDialog
        open={showReviewTextDialog}
        onClose={() => setShowReviewTextDialog(false)}
        rating={rating}
        tripInfo={lastTrip}
        token={token}
        onSuccess={handleReviewSubmit}
        onShowSnack={onShowSnack}
      />

      {selectedTrip && (
        <ViewReviewDialog
          open={showReviewDialog}
          onClose={handleCloseReviewDialog}
          review={selectedTrip.review}
          tripInfo={{
            from: selectedTrip.from,
            to: selectedTrip.to,
            date: selectedTrip.date,
            price: selectedTrip.price,
            rating: selectedTrip.rating,
            feedback: selectedTrip.feedback,
          }}
        />
      )}
    </>
  );
};

export default ExpandableReservations;
