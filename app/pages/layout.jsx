import { Box } from "@mui/material";
import React from "react";

const layout = ({ children }) => {
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      {children}
    </Box>
  );
};

export default layout;
