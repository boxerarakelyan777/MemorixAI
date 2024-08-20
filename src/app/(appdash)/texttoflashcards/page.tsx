"use client";

import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Container,
  Paper,
  Box,
  IconButton,
  CircularProgress,
  Grid,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SaveFlashcardsDialog from "../../../components/SaveFlashcardsDialog";
import { motion, AnimatePresence } from "framer-motion";

interface Flashcard {
  front: string;
  back: string;
}

const TextToFlashcard: React.FC = () => {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");

  const handleGenerateFlashcards = async () => {
    if (text !== "") {
      setIsLoading(true);
      setLastPrompt(text);
      try {
        const response = await fetch("/api/generate?type=prompt", {
          method: "POST",
          body: text,
        });
        const data = await response.json();
        setFlashcards(data);
        setCurrentIndex(0);
        setFlipped(false);
      } catch (error) {
        console.error("Error generating flashcards:", error);
        alert("Unable to generate flashcards. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter some text to generate flashcards.");
    }
  };

  const handleGenerateMoreFlashcards = async () => {
    if (lastPrompt !== "") {
      setIsLoading(true);
      try {
        const response = await fetch("/api/generate?type=prompt", {
          method: "POST",
          body: lastPrompt,
        });
        const newFlashcards = await response.json();
        setFlashcards([...flashcards, ...newFlashcards]);
      } catch (error) {
        console.error("Error generating more flashcards:", error);
        alert("Unable to generate more flashcards. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please generate initial flashcards first.");
    }
  };

  const handleRegenerateFlashcards = async () => {
    if (lastPrompt !== "") {
      setIsLoading(true);
      try {
        const response = await fetch("/api/generate?type=prompt", {
          method: "POST",
          body: lastPrompt,
        });
        const newFlashcards = await response.json();
        setFlashcards(newFlashcards);
        setCurrentIndex(0);
        setFlipped(false);
      } catch (error) {
        console.error("Error regenerating flashcards:", error);
        alert("Unable to regenerate flashcards. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please generate initial flashcards first.");
    }
  };

  const nextCard = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const flipCard = () => {
    setFlipped(!flipped);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" sx={{ my: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Text to Flashcard Generator
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Stack spacing={3}>
              <TextField
                label="Enter your text or topic here"
                multiline
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  handleGenerateFlashcards();
                  setText("");
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Generate Flashcards"
                )}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleGenerateMoreFlashcards}
                disabled={isLoading || flashcards.length === 0}
              >
                Generate More Flashcards
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleRegenerateFlashcards}
                disabled={isLoading || flashcards.length === 0}
              >
                Regenerate Flashcards
              </Button>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => setSaveModalOpen(true)}
                disabled={flashcards.length === 0}
              >
                Save Flashcards
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {flashcards.length > 0 ? (
            <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ position: 'relative', height: 300, perspective: 1000 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      cursor: 'pointer',
                    }}
                    onClick={flipCard}
                  >
                    <Paper elevation={3} sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 2,
                      transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      transition: 'transform 0.6s',
                    }}>
                      <Typography variant="h6" align="center">
                        {flashcards[currentIndex]?.front}
                      </Typography>
                    </Paper>
                    <Paper elevation={3} sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 2,
                      transform: flipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
                      transition: 'transform 0.6s',
                    }}>
                      <Typography variant="h6" align="center">
                        {flashcards[currentIndex]?.back}
                      </Typography>
                    </Paper>
                  </motion.div>
                </AnimatePresence>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <IconButton onClick={prevCard} color="primary">
                  <ChevronLeftIcon />
                </IconButton>
                <Typography>
                  {currentIndex + 1} / {flashcards.length}
                </Typography>
                <IconButton onClick={nextCard} color="primary">
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Paper>
          ) : (
            <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" color="text.secondary" align="center">
                Generate flashcards to see them here
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
      
      <SaveFlashcardsDialog
        open={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        flashcards={flashcards}
      />
    </Container>
  );
};

export default TextToFlashcard;