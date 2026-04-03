import { Box } from "@mui/material";
import React from "react";

const layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100%",
        overflowX: "clip",
      }}
    >
      {children}
    </Box>
  );
};

export default layout;
