import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { theme } from "../../../conf/theme";

export default function RouteRoleSelector({
  role,
  onChange,
  passengerLabel = "Sou um Passageiro",
  driverLabel = "Sou um Motorista",
}) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={role}
      exclusive
      onChange={onChange}
      sx={{
        display: "flex",
        gap: 1,
        width: "100%",
        justifyContent: "center",
        "& .MuiToggleButton-root": {
          flex: 1,
          textTransform: "none",
          borderRadius: "8px !important",
          border: `1px solid ${theme.palette.neutral[300]}`,
          color: theme.palette.text.primary,
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            border: "none",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        },
      }}
    >
      <ToggleButton value="passageiro">{passengerLabel}</ToggleButton>
      <ToggleButton value="motorista">{driverLabel}</ToggleButton>
    </ToggleButtonGroup>
  );
}
