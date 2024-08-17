// pages/index.tsx
"use client";

import React, { SetStateAction, useState } from "react";
import UploadForm from "@/components/UploadForm";
import Layout from "../layout";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { db } from "@/firebaseConfig";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

interface Flashcard {
  front: string;
  back: string;
}

const Dashboard: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([] as Flashcard[]);
  const [saveText, setSaveText] = useState("");
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [flipped, setFlipped] = useState([] as Boolean[]);
  const [fileName, setFileName] = useState("");

  const handleFileName = (newFileName: String) => {
    setFileName(newFileName as SetStateAction<string>);
  };

  const handleGenerateFlashcards = async () => {
    if (text !== "") {
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
        });
    } else if (fileName !== "") {
      const getExtension = (str: String) => str.slice(str.lastIndexOf(".") + 1);
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
        });
    } else {
      alert(
        "Please enter some text or upload document to generate flashcards."
      );
      return;
    }
  };

  const handleCardClick = (index: number) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleOpen = () => {
    setSaveModalOpen(true);
  };

  const handleClose = () => {
    setSaveModalOpen(false);
  };

  const saveFlashcards = async () => {
    if (!saveText.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      console.log(user);
      const userDocRef = doc(collection(db, "users"), user?.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: saveText },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: saveText }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), saveText);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleClose();
      setSaveText("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  return (
    <>
      <h1>Welcome to the Dashboard</h1>
      <p>This is the main content area of your dashboard.</p>
      <Stack spacing={2} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h5">Enter your flashcard prompt below:</Typography>
        <TextField
          label="Flashcard Prompt"
          sx={{ width: "50%" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <UploadForm fileNameHandler={handleFileName} />
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "30%" }}
          onClick={() => {
            handleGenerateFlashcards();
            setText("");
          }}
        >
          Generate Flashcards
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "30%" }}
          onClick={() => setSaveModalOpen(true)}
        >
          Save Flashcards
        </Button>
        <Dialog open={saveModalOpen} onClose={handleClose}>
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
              value={saveText}
              onChange={(e) => setSaveText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={saveFlashcards} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={2}>
          {flashcards &&
            flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Front:</Typography>
                    <Typography>{flashcard.front}</Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Back:
                    </Typography>
                    <Typography>{flashcard.back}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Stack>
    </>
  );
};

export default Dashboard;
