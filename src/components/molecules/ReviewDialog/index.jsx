import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
} from "@mui/material";
import StarRating from "../../atoms/StarRating";
import RouteText from "../../atoms/RouteText";
import { useState } from "react";
import { createAssessment } from "../../../api/assessment";

const ReviewDialog = ({
  open,
  onClose,
  rating,
  tripInfo,
  token,
  onSuccess,
  onShowSnack,
}) => {
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!tripInfo?.trip_id || !tripInfo.booking_id) {
      if (onShowSnack)
        onShowSnack("Dados da viagem incompletos. Tente novamente.", "warning");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        trip_id: tripInfo.trip_id,
        booking_id: tripInfo.booking_id,
        rating,
        feedback: reviewText || null,
      };

      await createAssessment(payload, token);

      if (onShowSnack) onShowSnack("Avaliação enviada com sucesso!", "success");

      if (onSuccess) onSuccess();
      setReviewText("");
      onClose();
    } catch (error) {
      if (onShowSnack)
        onShowSnack("Erro ao enviar avaliação. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setReviewText("");
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "8px",
            minWidth: { xs: "90%", sm: "500px" },
            maxWidth: "600px",
          },
        }}
      >
        <DialogTitle>
          <RouteText
            sx={{ fontWeight: 600, fontSize: "20px", color: "#1F2937" }}
          >
            Avaliar Viagem
          </RouteText>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              paddingY: 2,
            }}
          >
            {tripInfo && (
              <Box>
                <RouteText
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: 1,
                  }}
                >
                  {tripInfo.from} → {tripInfo.to}
                </RouteText>
                <RouteText sx={{ fontSize: "14px", color: "#6B7280" }}>
                  {tripInfo.date} - {tripInfo.driver}
                </RouteText>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <RouteText
                sx={{ fontSize: "16px", fontWeight: 500, color: "#374151" }}
              >
                Sua avaliação
              </RouteText>
              <StarRating rating={rating} readOnly={true} />
            </Box>

            <Box>
              <RouteText
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: 1,
                }}
              >
                Escreva seu feedback (opcional)
              </RouteText>
              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="Compartilhe sua experiência sobre esta viagem..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#E5E7EB",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D1D5DB",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3B82F6",
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button
            onClick={handleCancel}
            sx={{
              color: "#6B7280",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#F3F4F6",
              },
            }}
            disabled={loading}
          >
            Cancelar
          </Button>

          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#3B82F6",
              color: "white",
              textTransform: "none",
              fontWeight: 600,
              paddingX: 3,
              "&:hover": {
                backgroundColor: "#2563EB",
              },
            }}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Concluir"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewDialog;
