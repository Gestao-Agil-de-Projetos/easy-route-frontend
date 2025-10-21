import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { theme } from "../../../conf/theme";

export default function RouteEyeToggle({ visible, onClick }) {
  return (
    <IconButton 
      onClick={onClick} 
      edge="end" 
      sx={{ color: theme.palette.primary.main }}
    >
      {visible ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );
}