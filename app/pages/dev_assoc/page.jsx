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
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {selectedTest === "" ? (
          <Box sx={{ flex: 1, width: "600px" }}>
            {/* Hero Section */}
            <Box>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  mb: 3,
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.6)",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                  transition: "all 0.3s ease",
                }}
                startIcon={<ArrowBack />}
              >
                <Link
                  href={"/"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  Back to Home
                </Link>
              </Button>
            </Box>
            <Box sx={{ textAlign: "center", mb: 8, mt: 4 }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: "800",
                  mb: 3,
                  color: "white",
                  textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                AWS Developer Associate
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "300",
                  mb: 2,
                  color: "rgba(255,255,255,0.9)",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                Practice Tests
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: "700px",
                  margin: "0 auto",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.6,
                  textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                Choose a practice test to begin your AWS Developer Associate
                certification preparation
              </Typography>
            </Box>

            {/* Test Selection Cards */}
            <Grid
              sx={{ mt: 2, display: "grid", gap: 4, justifyContent: "center" }}
            >
              {Questions.map((item, index) => (
                <Grid item xs={12} md={6} key={item.testSelected}>
                  <Card
                    sx={{
                      height: "100%",
                      width: "500px",
                      display: "flex",
                      flexDirection: "column",
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: "relative",
                      opacity: item.questions.length === 0 ? 0.7 : 1,
                      "&:hover": {
                        transform:
                          item.questions.length === 0
                            ? "none"
                            : "translateY(-12px) scale(1.02)",
                        boxShadow:
                          item.questions.length === 0
                            ? "0 8px 24px rgba(0,0,0,0.15)"
                            : "0 20px 40px rgba(0,0,0,0.2)",
                        background:
                          item.questions.length === 0
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,1)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background:
                          item.difficulty === "Advanced"
                            ? "linear-gradient(90deg, #ff9a56 0%, #ff6b6b 100%)"
                            : "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, padding: "32px" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: "8px",
                            background:
                              item.difficulty === "Advanced"
                                ? "linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)"
                                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            mr: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Quiz sx={{ color: "white", fontSize: 24 }} />
                        </Box>
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{
                            fontWeight: "700",
                            color: "#2d3748",
                            lineHeight: 1.2,
                          }}
                        >
                          {item.testNumber}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "#718096",
                          mb: 3,
                          lineHeight: 1.6,
                          fontSize: "1.1rem",
                        }}
                      >
                        {item.description}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <Chip
                          icon={<Timer sx={{ fontSize: "16px !important" }} />}
                          label={item.duration}
                          size="small"
                          sx={{
                            backgroundColor: "#e2e8f0",
                            color: "#4a5568",
                            fontWeight: 600,
                            "& .MuiChip-icon": { color: "#667eea" },
                          }}
                        />
                        <Chip
                          label={item.difficulty}
                          size="small"
                          sx={{
                            backgroundColor:
                              item.difficulty === "Advanced"
                                ? "#fed7cc"
                                : "#bee3f8",
                            color:
                              item.difficulty === "Advanced"
                                ? "#c05621"
                                : "#2b6cb0",
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          label={`${
                            item.questions.total_questions ||
                            item.questions.length ||
                            0
                          } Questions`}
                          size="small"
                          sx={{
                            backgroundColor: "#c6f6d5",
                            color: "#276749",
                            fontWeight: 600,
                          }}
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
                              ? "rgba(156, 163, 175, 0.5)"
                              : item.difficulty === "Advanced"
                              ? "linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)"
                              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "12px",
                          textTransform: "none",
                          fontWeight: "700",
                          fontSize: "1.1rem",
                          py: 2,
                          boxShadow:
                            item.questions.length === 0
                              ? "none"
                              : "0 8px 25px rgba(102, 126, 234, 0.4)",
                          "&:hover": {
                            background:
                              item.questions.length === 0
                                ? "rgba(156, 163, 175, 0.5)"
                                : item.difficulty === "Advanced"
                                ? "linear-gradient(135deg, #ff8a42 0%, #ff5757 100%)"
                                : "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                            transform:
                              item.questions.length === 0
                                ? "none"
                                : "translateY(-2px)",
                            boxShadow:
                              item.questions.length === 0
                                ? "none"
                                : "0 12px 35px rgba(102, 126, 234, 0.5)",
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
          <Box
            sx={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.2)",
              p: 4,
              mt: 2,
            }}
          >
            {/* Back Button and Test Header */}
            <Box sx={{ mb: 4 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => setSelectedTest("")}
                sx={{
                  mb: 3,
                  borderColor: "#667eea",
                  color: "#667eea",
                  "&:hover": {
                    borderColor: "#5a6fd8",
                    backgroundColor: "rgba(102, 126, 234, 0.04)",
                  },
                }}
              >
                Back to Test Selection
              </Button>

              {selectedTestData && (
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    background:
                      "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
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
    </Box>
  );
};

export default page;
