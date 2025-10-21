import Button from "@mui/material/Button";
import { theme } from "../../../conf/theme";

export default function RouteButton({ children, ...props }) {
  return (
    <Button
      variant="contained"
      sx={{
        width: theme.sizes.button.large.width,
        height: theme.sizes.button.large.height,
        borderRadius: theme.shape.borderRadius,
        fontSize: theme.typography.h5.fontSize,
        textTransform: theme.typography.button.textTransform,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
