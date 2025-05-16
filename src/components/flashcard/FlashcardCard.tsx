import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Star } from 'lucide-react';
import type { Flashcard } from '../../types/flashcard';

interface FlashcardCardProps {
  card: Flashcard;
  onFlip?: () => void;
  showAnswer?: boolean;
}

const FlashcardCard: React.FC<FlashcardCardProps> = ({ card, onFlip, showAnswer = false }) => {
  const [isFlipped, setIsFlipped] = useState(showAnswer);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  const handleAudioPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.audioUrl) {
      const audio = new Audio(card.audioUrl);
      audio.play();
    }
  };

  const difficultyColors = {
    easy: 'bg-success-100 text-success-700',
    medium: 'bg-warning-100 text-warning-700',
    hard: 'bg-error-100 text-error-700',
  };

  return (
    <div
      className="relative w-full aspect-[3/2] cursor-pointer perspective-1000"
      onClick={handleClick}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full h-full relative preserve-3d"
      >
        {/* Front */}
        <div
          className={`absolute inset-0 w-full h-full bg-white rounded-xl shadow-medium p-6 backface-hidden
            ${isFlipped ? 'invisible' : 'visible'}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  difficultyColors[card.difficulty]
                }`}
              >
                {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
              </span>
              {card.audioUrl && (
                <button
                  onClick={handleAudioPlay}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Volume2 size={16} className="text-gray-600" />
                </button>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center">
              {card.imageUrl && (
                <div className="mb-4">
                  <img
                    src={card.imageUrl}
                    alt="Card illustration"
                    className="max-h-32 rounded-lg object-contain"
                  />
                </div>
              )}
              <p className="text-xl text-center font-medium text-gray-900">{card.front}</p>
            </div>

            <div className="mt-4 text-sm text-gray-500 text-center">
              Click to flip
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 w-full h-full bg-white rounded-xl shadow-medium p-6 backface-hidden rotate-y-180
            ${isFlipped ? 'visible' : 'invisible'}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl text-center text-gray-900">{card.back}</p>
            </div>

            <div className="mt-4 text-sm text-gray-500 text-center">
              Click to flip back
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlashcardCard;