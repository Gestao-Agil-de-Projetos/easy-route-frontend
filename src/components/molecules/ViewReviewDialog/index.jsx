import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
} from "@mui/material";
import StarRating from "../../atoms/StarRating";
import RouteText from "../../atoms/RouteText";
import { X } from "lucide-react";

const ViewReviewDialog = ({ open, onClose, tripInfo }) => {
  return (
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
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RouteText sx={{ fontWeight: 600, fontSize: "20px", color: "#1F2937" }}>
          Sua Avaliação
        </RouteText>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 3, paddingY: 2 }}
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
                {tripInfo.date} - {tripInfo.price}
              </RouteText>
            </Box>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <RouteText
              sx={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}
            >
              Sua nota
            </RouteText>
            <StarRating rating={tripInfo.rating || 0} readOnly={true} />
          </Box>

          {tripInfo?.feedback && (
            <Box>
              <RouteText
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: 1,
                }}
              >
                Seu comentário
              </RouteText>
              <Box
                sx={{
                  padding: "12px",
                  backgroundColor: "#F9FAFB",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
              >
                <RouteText
                  sx={{ fontSize: "14px", color: "#374151", lineHeight: 1.6 }}
                >
                  {tripInfo.feedback}
                </RouteText>
              </Box>
            </Box>
          )}

          {!tripInfo?.feedback && (
            <Box
              sx={{
                padding: "16px",
                backgroundColor: "#F9FAFB",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <RouteText
                sx={{ fontSize: "14px", color: "#6B7280", fontStyle: "italic" }}
              >
                Você não deixou um comentário nesta avaliação
              </RouteText>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReviewDialog;
