"use client";

import React, { useEffect, useState } from 'react';
import { Typography, Grid, Container, Paper, Box, IconButton, Button, CircularProgress, Snackbar } from '@mui/material';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';    
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardSet {
  id: string;
  name: string;
  flashcards: Flashcard[];
  prompt: string;
}

const SavedFlashcards: React.FC = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newFlashcards, setNewFlashcards] = useState<Flashcard[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchSavedFlashcards();
  }, []);

  const fetchSavedFlashcards = async () => {
    try {
      const q = query(collection(db, 'flashcardSets'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const sets: FlashcardSet[] = [];
      querySnapshot.forEach((doc) => {
        sets.push({ id: doc.id, ...doc.data() } as FlashcardSet);
      });
      setFlashcardSets(sets);
    } catch (error) {
      console.error('Error fetching saved flashcards:', error);
      showSnackbar('Error fetching saved flashcards');
    }
  };

  const handleSetClick = (set: FlashcardSet) => {
    setSelectedSet(set);
    setCurrentIndex(0);
    setFlipped(false);
    setNewFlashcards([]);
  };

  const handleBackToSets = () => {
    setSelectedSet(null);
    setFlipped(false);
    setNewFlashcards([]);
  };

  const nextCard = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (selectedSet?.flashcards.length || 1));
  };

  const prevCard = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (selectedSet?.flashcards.length || 1)) % (selectedSet?.flashcards.length || 1));
  };

  const flipCard = () => {
    setFlipped(!flipped);
  };

  const handleGenerateMore = async () => {
    if (selectedSet) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/generate?type=prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: selectedSet.prompt }),
        });
        if (!response.ok) {
          throw new Error('Failed to generate more flashcards');
        }
        const moreFlashcards = await response.json();
        setNewFlashcards(moreFlashcards);
      } catch (error) {
        console.error('Error generating more flashcards:', error);
        showSnackbar('Error generating more flashcards');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRegenerate = async () => {
    if (selectedSet) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/generate?type=prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: selectedSet.prompt }),
        });
        if (!response.ok) {
          throw new Error('Failed to regenerate flashcards');
        }
        const regeneratedFlashcards = await response.json();
        setNewFlashcards(regeneratedFlashcards);
      } catch (error) {
        console.error('Error regenerating flashcards:', error);
        showSnackbar('Error regenerating flashcards');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSaveNewFlashcards = async () => {
    if (selectedSet && newFlashcards.length > 0) {
      try {
        const updatedFlashcards = [...selectedSet.flashcards, ...newFlashcards];
        await updateDoc(doc(db, 'flashcardSets', selectedSet.id), {
          flashcards: updatedFlashcards,
        });
        setSelectedSet({ ...selectedSet, flashcards: updatedFlashcards });
        setNewFlashcards([]);
        showSnackbar('New flashcards saved successfully');
      } catch (error) {
        console.error('Error saving new flashcards:', error);
        showSnackbar('Error saving new flashcards');
      }
    }
  };

  const handleCancelNewFlashcards = () => {
    setNewFlashcards([]);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  if (selectedSet) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleBackToSets}>
            Back to Sets
          </Button>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateMore}
              disabled={isLoading}
              sx={{ mr: 1 }}
            >
              Generate More
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleRegenerate}
              disabled={isLoading}
            >
              Regenerate
            </Button>
          </Box>
        </Box>
        <Typography variant="h4" gutterBottom>{selectedSet.name}</Typography>
        {newFlashcards.length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveNewFlashcards}
              sx={{ mr: 1 }}
            >
              Save New Flashcards
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelNewFlashcards}
            >
              Cancel
            </Button>
          </Box>
        )}
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
                  {selectedSet.flashcards[currentIndex]?.front}
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
                  {selectedSet.flashcards[currentIndex]?.back}
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
            {currentIndex + 1} / {selectedSet.flashcards.length}
          </Typography>
          <IconButton onClick={nextCard}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Saved Flashcard Sets</Typography>
      <Grid container spacing={2}>
        {flashcardSets.map((set) => (
          <Grid item xs={12} sm={6} md={4} key={set.id}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                cursor: 'pointer', 
                '&:hover': { backgroundColor: 'action.hover' } 
              }}
              onClick={() => handleSetClick(set)}
            >
              <Typography variant="h6">{set.name}</Typography>
              <Typography variant="body2">{set.flashcards.length} cards</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {flashcardSets.length === 0 && (
        <Typography variant="body1">No saved flashcard sets found.</Typography>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default SavedFlashcards;