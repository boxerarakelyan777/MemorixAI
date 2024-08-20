"use client";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Stack,
  Grid,
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

  const handleGenerateMoreFlashcards = async () => {
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
        
        const newFlashcards = await response.json();
        setFlashcards([...flashcards, ...newFlashcards]);
      } catch (error) {
        console.error('Error generating more flashcards:', error);
        setError('Failed to generate more flashcards. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please upload a document first.");
    }
  };

  const handleRegenerateFlashcards = async () => {
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
        
        const newFlashcards = await response.json();
        setFlashcards(newFlashcards);
        setCurrentIndex(0);
        setFlipped(false);
      } catch (error) {
        console.error('Error regenerating flashcards:', error);
        setError('Failed to regenerate flashcards. Please try again.');
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
      <Typography variant="h4" gutterBottom align="center" sx={{ my: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Document to Flashcard Generator
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Stack spacing={3}>
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
                  fullWidth
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
      {error && (
        <Typography color="error" variant="body1" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default DocToFlashcard;