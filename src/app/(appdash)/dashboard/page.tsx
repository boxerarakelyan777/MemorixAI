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

interface Flashcard {
  front: string;
  back: string;
}

const Dashboard: React.FC = () => {
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
    if (text != "") {
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
    } else if (fileName != "") {
      const getExtension = (str: String) => str.slice(str.lastIndexOf(".") + 1);
      const response = await fetch(
        `/api/generate?type=${getExtension(fileName)}`,
        { method: "POST", body: fileName }
      ).then((res) => res.json())
      .catch((error) => {
        console.log(error);
      })
      .then((data) => {
        setFlashcards(data);
      });
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
        <Modal
          open={saveModalOpen}
          onClose={() => setSaveModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              maxWidth: 400,
              p: 4,
              borderRadius: 4,
              border: "1px solid #ccc",
              alignContent: "center",
            }}
          >
            <CardContent>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Enter a name for your flashcard set:
              </Typography>
              <TextField
                sx={{ mt: 2, width: "100%" }}
                value={saveText}
                onChange={(e) => setSaveText(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => {
                  setSaveModalOpen(false);
                }}
              >
                Save
              </Button>
            </CardContent>
          </Card>
        </Modal>
        <Grid container spacing={2}>
          {flashcards &&
            flashcards.map((flashcard: Flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      console.log(flashcard);
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px",
                          "& > div": {
                            transformStyle: "preserve-3d",
                            transition: "transform 0.8s",
                            cursor: "pointer",
                            position: "relative",
                            width: "100px",
                            height: "200px",
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          },
                          "& > div > div": {
                            cursor: "pointer",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 2,
                            boxSizing: "border-box",
                          },
                          "& > div > div:nth-of-type(2)": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h6" component={"div"}>
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h6" component={"div"}>
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Stack>
    </>
  );
};

export default Dashboard;
