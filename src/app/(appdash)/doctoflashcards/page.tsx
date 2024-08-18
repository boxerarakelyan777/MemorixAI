"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  Container,
  Paper,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { uploadFile } from "../dashboard/upload-action";
import SaveFlashcardsDialog from "../../../components/SaveFlashcardsDialog";
import Flashcard from "../../../components/Flashcard";
import { motion, AnimatePresence } from "framer-motion";

interface Flashcard {
  front: string;
  back: string;
}

const DocToFlashcard: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileName = (newFileName: string) => {
    setFileName(newFileName);
  };

  const handleGenerateFlashcards = async () => {
    if (fileName !== "") {
      setIsLoading(true);
      const getExtension = (str: string) => str.slice(str.lastIndexOf(".") + 1);
      const response = await fetch(
        `/api/generate?type=${getExtension(fileName)}`,
        { method: "POST", body: fileName }
      )
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
      alert("Please upload a document to generate flashcards.");
    }
  };

  const handleFlip = (index: number) => {
    setFlippedCards((prevFlippedCards) => {
      const newFlippedCards = [...prevFlippedCards];
      newFlippedCards[index] = !prevFlippedCards[index];
      return newFlippedCards;
    });
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
          Document to Flashcard
        </Typography>
        <Stack spacing={4} justifyContent="center" alignItems="center">
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <form action={uploadFile as unknown as string}>
              <input
                type="file"
                name="file"
                id="file-upload"
                hidden
                onChange={(e) => handleFileName(e.target.files?.[0]?.name || "")}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Choose File
                </Button>
              </label>
              <Typography variant="body2">{fileName || "No file chosen"}</Typography>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Upload
              </Button>
            </form>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleGenerateFlashcards}
            sx={{ maxWidth: 300 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Generate Flashcards"
            )}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setSaveModalOpen(true)}
            sx={{ maxWidth: 300 }}
          >
            Save Flashcards
          </Button>
          <SaveFlashcardsDialog
            open={saveModalOpen}
            onClose={() => setSaveModalOpen(false)}
            flashcards={flashcards}
          />
        </Stack>
      </Paper>
      
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

export default DocToFlashcard;