import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  const examTypes = [
    {
      name: "AWS Certified Developer – Associate",
      route: "pages/dev_assoc",
      description:
        "Validate your ability to develop, deploy, and debug cloud-based applications",
    },
    {
      name: "AWS Certified Solutions Architect",
      route: "pages/",
      description:
        "Design and deploy scalable, highly available systems on AWS",
    },
    {
      name: "AWS Certified SysOps Administrator",
      route: "pages/",
      description:
        "Demonstrate your experience in deployment, management, and operations on AWS",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px 0",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            color: "white",
            marginBottom: "60px",
            paddingTop: "40px",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            AWS Certification Practice
          </Typography>
          <Typography
            variant="h5"
            sx={{
              opacity: 0.9,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Master your AWS skills with our comprehensive practice exams
          </Typography>
        </Box>

        {/* Exam Types Section */}
        <Box sx={{ marginBottom: "40px" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: "center",
              color: "white",
              marginBottom: "40px",
              fontWeight: "600",
            }}
          >
            Available Exam Types
          </Typography>

          <Grid container spacing={4}>
            {examTypes.map((exam, index) => (
              <Grid item xs={12} md={6} key={exam.route}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                    },
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    borderRadius: "16px",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, padding: "32px" }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: "16px",
                        color: "#333",
                        lineHeight: 1.3,
                      }}
                    >
                      {exam.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        lineHeight: 1.6,
                      }}
                    >
                      {exam.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ padding: "0 32px 32px 32px" }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        background:
                          "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: "600",
                        padding: "12px 24px",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)",
                        },
                      }}
                    >
                      <Link
                        href={exam.route}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                        }}
                      >
                        Start Practice Exam
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
