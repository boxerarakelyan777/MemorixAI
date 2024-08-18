"use client";

import React from "react";
import { Typography, Button, Container, Paper, Grid, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DescriptionIcon from '@mui/icons-material/Description';
import SaveIcon from '@mui/icons-material/Save';

const Dashboard: React.FC = () => {
  const router = useRouter();

  const cards = [
    {
      title: "Text to Flashcard",
      description: "Generate flashcards from text input",
      icon: <TextFieldsIcon sx={{ fontSize: 40 }} />,
      action: () => router.push("/texttoflashcards"),
    },
    {
      title: "Document to Flashcard",
      description: "Create flashcards from uploaded documents",
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      action: () => router.push("/doctoflashcards"),
    },
    {
      title: "Saved Flashcards",
      description: "View and review your saved flashcard sets",
      icon: <SaveIcon sx={{ fontSize: 40 }} />,
      action: () => router.push("/savedflashcards"),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Welcome to FlashCard Generator
        </Typography>
        <Typography variant="h5" paragraph align="center" sx={{ mb: 6, color: 'text.secondary' }}>
          Choose a flashcard generation method or view your saved sets
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ mb: 2, color: 'primary.main' }}>{card.icon}</Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {card.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={card.action}
                  sx={{ mt: 'auto' }}
                >
                  Get Started
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;