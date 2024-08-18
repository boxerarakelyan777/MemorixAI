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

  const handleGenerateFlashcards = async () => {
    if (text !== "") {
      setIsLoading(true);
      const response = await fetch("/api/generate?type=prompt", {
        method: "POST",
        body: text,
      })
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        })
        .then((data) => {
          setFlashcards(data);
          setCurrentIndex(0);
          setFlipped(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      alert("Please enter some text to generate flashcards.");
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
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Text to Flashcard
        </Typography>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <TextField
            label="Flashcard Prompt"
            multiline
            rows={4}
            sx={{ width: "100%" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "50%" }}
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
            sx={{ width: "50%" }}
            onClick={() => setSaveModalOpen(true)}
            disabled={flashcards.length === 0}
          >
            Save Flashcards
          </Button>
        </Stack>
      </Paper>
      
      <SaveFlashcardsDialog
        open={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        flashcards={flashcards}
      />

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
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
                  <Typography variant="h6">
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
                  <Typography variant="h6">
                    {flashcards[currentIndex]?.back}
                  </Typography>
                </Paper>
              </motion.div>
            </AnimatePresence>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <IconButton onClick={prevCard}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography>
              {currentIndex + 1} / {flashcards.length}
            </Typography>
            <IconButton onClick={nextCard}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default TextToFlashcard;