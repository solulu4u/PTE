import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import Button from '../common/Button';
import FlashcardCard from './FlashcardCard';
import type { Flashcard } from '../../types/flashcard';

interface FlashcardDeckProps {
  cards: Flashcard[];
  onCardReview?: (cardId: string, isCorrect: boolean) => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ cards, onCardReview }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setDirection(randomIndex > currentIndex ? 1 : -1);
    setCurrentIndex(randomIndex);
  };

  const handleCardFlip = () => {
    // Optional: Track when a card is flipped
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative h-96 mb-8">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <FlashcardCard
              card={cards[currentIndex]}
              onFlip={handleCardFlip}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Card {currentIndex + 1} of {cards.length}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            iconLeft={<ChevronLeft size={16} />}
          >
            Previous
          </Button>
          
          <Button
            variant="outline"
            onClick={handleShuffle}
            iconLeft={<Shuffle size={16} />}
          >
            Shuffle
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            iconRight={<ChevronRight size={16} />}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDeck;