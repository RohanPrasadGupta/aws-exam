"use client";
import React, { useState } from "react";
import test1 from "../../data/assocDev/test-1.json";
import test2 from "../../data/assocDev/test-2.json";
import DevAssoc from "@/app/component/devAssoc/DevAssoc";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  Chip,
} from "@mui/material";
import { ArrowBack, Quiz, Timer } from "@mui/icons-material";
import Link from "next/link";

const page = () => {
  const Questions = [
    {
      testNumber: "AWS Developer Associate - Test 1",
      questions: test1,
      testSelected: "test-1",
      description:
        "Complete practice exam with 105 questions covering all AWS Developer Associate domains",
      duration: "180 minutes",
      difficulty: "Mixed",
    },
    {
      testNumber: "AWS Developer Associate - Test 2",
      questions: test2,
      testSelected: "test-2",
      description:
        "Advanced practice exam with 105 questions focusing on practical scenarios",
      duration: "180 minutes",
      difficulty: "Advanced",
    },
  ];

  const [selectedTest, setSelectedTest] = useState("");
  const selectedTestData = Questions.find(
    (test) => test.testSelected === selectedTest
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {selectedTest === "" ? (
        <Box>
          {/* Hero Section */}
          <Box>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              //   onClick ={() => (window.location.href = "/")}
              sx={{ mb: 3 }}
            >
              <Link
                href={"/"}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                Back
              </Link>
            </Button>
          </Box>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 2,
                background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AWS Developer Associate Practice Tests
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: "600px", margin: "0 auto" }}
            >
              Choose a practice test to begin your AWS Developer Associate
              certification preparation
            </Typography>
          </Box>

          {/* Test Selection Cards */}
          <Grid container spacing={4}>
            {Questions.map((item, index) => (
              <Grid item xs={12} md={6} key={item.testSelected}>
                <Card
                  sx={{
                    height: "100%",
                    minWidth: "600px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                    },
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    borderRadius: "16px",
                    opacity: item.questions.length === 0 ? 0.6 : 1,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, padding: "32px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Quiz sx={{ mr: 1, color: "#667eea" }} />
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        {item.testNumber}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{ color: "#666", mb: 3, lineHeight: 1.6 }}
                    >
                      {item.description}
                    </Typography>

                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                    >
                      <Chip
                        icon={<Timer />}
                        label={item.duration}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={item.difficulty}
                        size="small"
                        color={
                          item.difficulty === "Advanced" ? "warning" : "primary"
                        }
                        variant="outlined"
                      />
                      <Chip
                        label={`${
                          item.questions.total_questions ||
                          item.questions.length ||
                          0
                        } Questions`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>

                  <CardActions sx={{ padding: "0 32px 32px 32px" }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={item.questions.length === 0}
                      onClick={() => setSelectedTest(item.testSelected)}
                      sx={{
                        background:
                          item.questions.length === 0
                            ? "rgba(0,0,0,0.12)"
                            : "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: "600",
                        padding: "12px 24px",
                        "&:hover": {
                          background:
                            item.questions.length === 0
                              ? "rgba(0,0,0,0.12)"
                              : "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)",
                        },
                      }}
                    >
                      {item.questions.length === 0
                        ? "Coming Soon"
                        : "Start Practice Exam"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box>
          {/* Back Button and Test Header */}
          <Box sx={{ mb: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => setSelectedTest("")}
              sx={{ mb: 3 }}
            >
              Back to Test Selection
            </Button>

            {selectedTestData && (
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold" }}
              >
                {selectedTestData.testNumber}
              </Typography>
            )}
          </Box>

          {/* Test Component */}
          <DevAssoc selectedTest={selectedTest} testData={selectedTestData} />
        </Box>
      )}
    </Container>
  );
};

export default page;
