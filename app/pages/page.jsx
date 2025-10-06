"use client";
import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./home/page";
import CircularProgress from "@mui/material/CircularProgress";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/pages/home");
  }, [router]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress enableTrackSlot size="3rem" />
    </Box>
  );
};

export default Page;
