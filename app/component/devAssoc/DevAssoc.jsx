import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Button,
  LinearProgress,
  Chip,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import {
  NavigateNext,
  NavigateBefore,
  CheckCircle,
  Cancel,
  Timer,
  Quiz,
} from "@mui/icons-material";

const DevAssoc = ({ selectedTest, testData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180 * 60); // 3 hours in seconds
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  // Handle different test formats
  const getQuestions = () => {
    if (!testData?.questions) return [];

    // Check if it's test-1 format (nested structure) or test-2 format (flat array)
    if (Array.isArray(testData.questions)) {
      // test-2 format: questions is directly an array
      return testData.questions;
    } else if (
      testData.questions.questions &&
      Array.isArray(testData.questions.questions)
    ) {
      // test-1 format: questions.questions is the array
      return testData.questions.questions;
    }

    return [];
  };

  const questions = getQuestions();
  const totalQuestions = questions.length;

  // Get exam info based on test format
  const getExamInfo = () => {
    if (!testData?.questions)
      return {
        exam: "Practice Test",
        version: "1.0",
        total_questions: 0,
      };

    if (Array.isArray(testData.questions)) {
      // test-2 format: no exam metadata, use defaults
      return {
        exam: "AWS Certified Developer - Associate (Practice)",
        version: "2.0",
        total_questions: testData.questions.length,
      };
    } else {
      // test-1 format: has exam metadata
      return {
        exam: testData.questions.exam || "Practice Test",
        version: testData.questions.version || "1.0",
        total_questions:
          testData.questions.total_questions ||
          testData.questions.questions?.length ||
          0,
      };
    }
  };

  const examInfo = getExamInfo();

  // Timer effect
  useEffect(() => {
    if (showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    // Prevent answer changes if question has been answered and feedback shown
    if (answeredQuestions.has(questionId)) return;

    const question = questions[currentQuestion];
    const isMultipleChoice = question?.correct_answers?.length > 1;

    if (isMultipleChoice) {
      const currentAnswers = userAnswers[questionId] || [];
      const newAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((a) => a !== answer)
        : [...currentAnswers, answer];

      setUserAnswers((prev) => ({
        ...prev,
        [questionId]: newAnswers,
      }));
    } else {
      setUserAnswers((prev) => ({
        ...prev,
        [questionId]: [answer],
      }));
    }
  };

  const isCurrentAnswerCorrect = () => {
    const userAnswer = userAnswers[currentQuestionData?.id] || [];
    const correctAnswers = currentQuestionData?.correct_answers || [];

    return (
      userAnswer.length === correctAnswers.length &&
      userAnswer.every((answer) => correctAnswers.includes(answer))
    );
  };

  const updateScore = (questionId) => {
    if (answeredQuestions.has(questionId)) return; // Already counted

    const isCorrect = isCurrentAnswerCorrect();

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }

    setAnsweredQuestions((prev) => new Set([...prev, questionId]));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id] || [];
      const correctAnswers = question.correct_answers;

      if (
        userAnswer.length === correctAnswers.length &&
        userAnswer.every((answer) => correctAnswers.includes(answer))
      ) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100),
    };
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "error";
      default:
        return "primary";
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const isMultipleChoice = currentQuestionData?.correct_answers?.length > 1;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  if (!testData || questions.length === 0) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        No questions available for this test.
      </Alert>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
            Test Complete!
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
            {examInfo.exam}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              color: score.percentage >= 70 ? "success.main" : "error.main",
            }}
          >
            Score: {score.correct}/{score.total} ({score.percentage}%)
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {score.percentage >= 70
              ? "Congratulations! You passed!"
              : "Keep studying and try again!"}
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id] || [];
            const isCorrect =
              userAnswer.length === question.correct_answers.length &&
              userAnswer.every((answer) =>
                question.correct_answers.includes(answer)
              );

            return (
              <Grid item xs={6} sm={4} md={3} key={question.id}>
                <Chip
                  label={`Q${index + 1}`}
                  color={isCorrect ? "success" : "error"}
                  variant={userAnswer.length > 0 ? "filled" : "outlined"}
                  icon={isCorrect ? <CheckCircle /> : <Cancel />}
                />
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setCurrentQuestion(0);
              setUserAnswers({});
              setShowResults(false);
              setTimeRemaining(180 * 60);
              setAnsweredQuestions(new Set());
              setCorrectCount(0);
              setWrongCount(0);
            }}
            sx={{
              background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
              px: 4,
            }}
          >
            Retake Test
          </Button>
        </Box>
      </Paper>
    );
  }

  const handleNext = () => {
    if (userAnswers[currentQuestionData?.id]) {
      updateScore(currentQuestionData.id);
      setShowAnswerFeedback(true);
      setShowExplanation(true);
    } else {
      // If no answer selected, just move to next question
      setCurrentQuestion((prev) => Math.min(totalQuestions - 1, prev + 1));
    }
  };

  const handleContinueToNext = () => {
    setShowExplanation(false);
    setShowAnswerFeedback(false);
    setCurrentQuestion((prev) => Math.min(totalQuestions - 1, prev + 1));
  };

  const handlePrevious = () => {
    setShowExplanation(false);
    setShowAnswerFeedback(false);
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  const isAnswerCorrect = (optionKey) => {
    return currentQuestionData?.correct_answers?.includes(optionKey);
  };

  const isAnswerSelected = (optionKey) => {
    return (userAnswers[currentQuestionData?.id] || []).includes(optionKey);
  };

  const getOptionBackgroundColor = (optionKey) => {
    if (!showAnswerFeedback) return "transparent";

    const isCorrect = isAnswerCorrect(optionKey);
    const isSelected = isAnswerSelected(optionKey);

    if (isCorrect && isSelected) {
      return "rgba(76, 175, 80, 0.1)"; // Light green for correct selection
    } else if (isCorrect && !isSelected) {
      return "rgba(76, 175, 80, 0.05)"; // Very light green for correct but not selected
    } else if (!isCorrect && isSelected) {
      return "rgba(244, 67, 54, 0.1)"; // Light red for wrong selection
    }
    return "transparent";
  };

  const getOptionBorderColor = (optionKey) => {
    if (!showAnswerFeedback) return "transparent";

    const isCorrect = isAnswerCorrect(optionKey);
    const isSelected = isAnswerSelected(optionKey);

    if (isCorrect) {
      return "2px solid #4CAF50"; // Green border for correct answers
    } else if (!isCorrect && isSelected) {
      return "2px solid #f44336"; // Red border for wrong selections
    }
    return "transparent";
  };

  return (
    <Box sx={{ maxWidth: "100%", margin: "0 auto" }}>
      {/* Progress and Timer Header */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ flexShrink: 0 }}>
            Question {currentQuestion + 1} of {totalQuestions}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: { xs: "flex-start", sm: "flex-end" },
            }}
          >
            <Chip
              icon={<Timer />}
              label={formatTime(timeRemaining)}
              color="primary"
              size="small"
            />
            {currentQuestionData?.difficulty && (
              <Chip
                label={currentQuestionData.difficulty}
                color={getDifficultyColor(currentQuestionData.difficulty)}
                size="small"
              />
            )}
          </Box>
        </Box>

        {/* Score Counter */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 2 }}>
          <Chip
            icon={<CheckCircle />}
            label={`Correct: ${correctCount}`}
            color="success"
            variant="outlined"
            size="small"
          />
          <Chip
            icon={<Cancel />}
            label={`Wrong: ${wrongCount}`}
            color="error"
            variant="outlined"
            size="small"
          />
          <Chip
            label={`Answered: ${answeredQuestions.size}/${totalQuestions}`}
            color="info"
            variant="outlined"
            size="small"
          />
        </Box>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Paper>

      {/* Question Card */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ mb: 3 }}>
            {currentQuestionData?.domain && (
              <Chip
                label={currentQuestionData.domain}
                variant="outlined"
                sx={{ mb: 2 }}
                size="small"
              />
            )}
            <Typography
              variant="h6"
              sx={{
                lineHeight: 1.6,
                fontWeight: 500,
                mb: isMultipleChoice ? 2 : 0,
              }}
            >
              {currentQuestionData?.question}
            </Typography>
            {isMultipleChoice && (
              <Alert severity="info" sx={{ mt: 2 }}>
                This question has multiple correct answers. Select all that
                apply.
              </Alert>
            )}
          </Box>

          <FormControl component="fieldset" fullWidth>
            {isMultipleChoice ? (
              <FormGroup>
                {Object.entries(currentQuestionData?.options || {}).map(
                  ([key, value]) => (
                    <Box
                      key={key}
                      sx={{
                        mb: 1.5,
                        backgroundColor: getOptionBackgroundColor(key),
                        border: getOptionBorderColor(key),
                        borderRadius: 2,
                        p: 1.5,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor:
                            !showAnswerFeedback &&
                            !answeredQuestions.has(currentQuestionData?.id)
                              ? "rgba(0,0,0,0.02)"
                              : undefined,
                        },
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={(
                              userAnswers[currentQuestionData.id] || []
                            ).includes(key)}
                            onChange={() =>
                              handleAnswerChange(currentQuestionData.id, key)
                            }
                            disabled={
                              showAnswerFeedback ||
                              answeredQuestions.has(currentQuestionData?.id)
                            }
                            sx={{ alignSelf: "flex-start", mt: -0.5 }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              lineHeight: 1.5,
                              wordBreak: "break-word",
                            }}
                          >
                            <strong>{key}.</strong> {value}
                          </Typography>
                        }
                        sx={{
                          alignItems: "flex-start",
                          margin: 0,
                          width: "100%",
                          "& .MuiFormControlLabel-label": {
                            mt: 0.5,
                            flex: 1,
                          },
                        }}
                      />
                    </Box>
                  )
                )}
              </FormGroup>
            ) : (
              <RadioGroup
                value={(userAnswers[currentQuestionData?.id] || [])[0] || ""}
                onChange={(e) =>
                  handleAnswerChange(currentQuestionData.id, e.target.value)
                }
              >
                {Object.entries(currentQuestionData?.options || {}).map(
                  ([key, value]) => (
                    <Box
                      key={key}
                      sx={{
                        mb: 1.5,
                        backgroundColor: getOptionBackgroundColor(key),
                        border: getOptionBorderColor(key),
                        borderRadius: 2,
                        p: 1.5,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor:
                            !showAnswerFeedback &&
                            !answeredQuestions.has(currentQuestionData?.id)
                              ? "rgba(0,0,0,0.02)"
                              : undefined,
                        },
                      }}
                    >
                      <FormControlLabel
                        value={key}
                        control={
                          <Radio
                            disabled={
                              showAnswerFeedback ||
                              answeredQuestions.has(currentQuestionData?.id)
                            }
                            sx={{ alignSelf: "flex-start", mt: -0.5 }}
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              lineHeight: 1.5,
                              wordBreak: "break-word",
                            }}
                          >
                            <strong>{key}.</strong> {value}
                          </Typography>
                        }
                        sx={{
                          alignItems: "flex-start",
                          margin: 0,
                          width: "100%",
                          "& .MuiFormControlLabel-label": {
                            mt: 0.5,
                            flex: 1,
                          },
                        }}
                      />
                    </Box>
                  )
                )}
              </RadioGroup>
            )}
          </FormControl>
        </CardContent>
      </Card>

      {/* Inline Explanation Section */}
      {showExplanation && (
        <Card
          sx={{
            mb: 3,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "#f8f9fa",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                Explanation
              </Typography>
            </Box>
            <Alert severity="info" sx={{ mb: 2 }}>
              <strong>Correct Answer(s):</strong>{" "}
              {currentQuestionData?.correct_answers?.join(", ")}
            </Alert>
            <Typography sx={{ lineHeight: 1.6 }}>
              {currentQuestionData?.explanation}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Navigation and Submit */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: 2,
          mt: 3,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<NavigateBefore />}
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          sx={{
            minWidth: { xs: "100%", sm: "auto" },
            order: { xs: 2, sm: 1 },
          }}
        >
          Previous
        </Button>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "flex-end" },
            order: { xs: 1, sm: 2 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {!showAnswerFeedback && (
            <Button
              variant="outlined"
              onClick={() => setShowExplanation(true)}
              disabled={!userAnswers[currentQuestionData?.id]}
              sx={{ minWidth: { xs: "120px", sm: "auto" } }}
            >
              Show Explanation
            </Button>
          )}

          {currentQuestion === totalQuestions - 1 ? (
            <Button
              variant="contained"
              onClick={() => setShowResults(true)}
              sx={{
                background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                minWidth: { xs: "120px", sm: "auto" },
              }}
            >
              Finish Test
            </Button>
          ) : showAnswerFeedback ? (
            <Button
              variant="contained"
              endIcon={<NavigateNext />}
              onClick={handleContinueToNext}
              sx={{
                background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                minWidth: { xs: "140px", sm: "auto" },
              }}
            >
              Continue to Next
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<NavigateNext />}
              onClick={handleNext}
              disabled={!userAnswers[currentQuestionData?.id]}
              sx={{ minWidth: { xs: "120px", sm: "auto" } }}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DevAssoc;
