import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';

interface FlashcardProps {
  front: string;
  back: string;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Reset to front side whenever the question changes
    setIsFlipped(false);
  }, [front]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip();
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <div className="flashcardContainer">
        <div 
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
        >
          <div className="front">
            <Typography variant="h6" className="cardText">{front}</Typography>
          </div>
          <div className="back">
            <Typography variant="h6" className="cardText">{back}</Typography>
          </div>
        </div>
      </div>
      <style>{`
        .flashcardContainer {
          perspective: 1000px;
          width: 100%;
          height: 200px;
        }
        .flashcard {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .flashcard.flipped {
          transform: rotateY(180deg);
        }
        .front, .back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .back {
          transform: rotateY(180deg);
        }
        .cardText {
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
          text-align: center;
        }
      `}</style>
    </Grid>
  );
};

export default Flashcard;