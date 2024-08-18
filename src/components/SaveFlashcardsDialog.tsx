import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, doc, getDoc, writeBatch, addDoc } from "firebase/firestore";

interface Flashcard {
  front: string;
  back: string;
}

interface SaveFlashcardsDialogProps {
  open: boolean;
  onClose: () => void;
  flashcards: Flashcard[];
}

const SaveFlashcardsDialog: React.FC<SaveFlashcardsDialogProps> = ({
  open,
  onClose,
  flashcards,
}) => {
  const [setName, setSetName] = useState('');

  const handleSave = async () => {
    try {
      await addDoc(collection(db, 'flashcardSets'), {
        name: setName,
        flashcards: flashcards,
        createdAt: new Date()
      });
      onClose();
      // Optionally, show a success message
    } catch (error) {
      console.error('Error saving flashcards:', error);
      // Optionally, show an error message
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save Flashcard Set</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a name for your flashcard set.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Set Name"
          type="text"
          fullWidth
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveFlashcardsDialog;