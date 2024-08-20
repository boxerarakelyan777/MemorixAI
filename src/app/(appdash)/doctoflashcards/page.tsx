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
  const [fileName, setFileName] = useState<string | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const result = await uploadFile(formData);
        handleFileUpload(result.fileName, result.downloadURL);
      } catch (error) {
        console.error('Error uploading file:', error);
        setError('Failed to upload file. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileUpload = (newFileName: string, newDownloadURL: string) => {
    setFileName(newFileName);
    setDownloadURL(newDownloadURL);
    console.log("File uploaded:", newFileName);
    console.log("Download URL:", newDownloadURL);
  };

  const handleGenerateFlashcards = async () => {
    if (fileName && downloadURL) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/generate?type=document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileName, downloadURL }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (Array.isArray(data)) {
          setFlashcards(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error generating flashcards:', error);
        setError('Failed to generate flashcards. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please upload a document first.");
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
          Document to Flashcard
        </Typography>
        <Stack spacing={4} justifyContent="center" alignItems="center">
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <input
              type="file"
              id="file-upload"
              hidden
              onChange={handleFileChange}
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
            <Button 
              onClick={handleUpload} 
              variant="contained" 
              sx={{ mt: 2 }}
              disabled={!file || isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Upload"
              )}
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleGenerateFlashcards}
            sx={{ maxWidth: 300 }}
            disabled={!downloadURL || isLoading}
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
            onClick={() => setSaveModalOpen(true)}
            sx={{ maxWidth: 300 }}
            disabled={flashcards.length === 0}
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
      {error && (
        <Typography color="error" variant="body1" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default DocToFlashcard;