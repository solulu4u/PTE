import { useState, useRef } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Play, Pause, Check, RefreshCw, Info } from 'lucide-react';
import { motion } from 'framer-motion';

type Word = {
  id: string;
  text: string;
  isIncorrect: boolean;
};

type HighlightIncorrectWordsProps = {
  question: {
    id: number;
    audio_url: string;
    words: Word[];
    time_limit: number;
  };
  onComplete: (selectedWordIds: string[]) => void;
};

const HighlightIncorrectWords: React.FC<HighlightIncorrectWordsProps> = ({ question, onComplete }) => {
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setHasListened(true);
  };

  const handleWordClick = (wordId: string) => {
    if (isSubmitted) return;

    setSelectedWords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(wordId)) {
        newSet.delete(wordId);
      } else {
        newSet.add(wordId);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete(Array.from(selectedWords));
  };

  const handleReset = () => {
    setSelectedWords(new Set());
    setIsSubmitted(false);
    setHasListened(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const calculateScore = () => {
    const correctSelections = question.words.filter(
      (word) => word.isIncorrect === selectedWords.has(word.id)
    ).length;
    return Math.round((correctSelections / question.words.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Highlight Incorrect Words</h2>
          {!isSubmitted && (
            <Timer
              initialTime={question.time_limit}
              onComplete={handleSubmit}
              variant="default"
              size="md"
              labelPosition="left"
            />
          )}
        </div>

        {/* Audio Player */}
        <div className="mb-8">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <audio
              ref={audioRef}
              src={question.audio_url}
              onEnded={handleAudioEnd}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="hidden"
            />
            
            <div className="text-center">
              <Button
                onClick={handlePlayPause}
                variant="primary"
                size="lg"
                iconLeft={isPlaying ? <Pause size={20} /> : <Play size={20} />}
              >
                {isPlaying ? 'Pause Audio' : hasListened ? 'Play Again' : 'Play Audio'}
              </Button>
              
              {!hasListened && (
                <p className="mt-3 text-sm text-gray-600">
                  Listen to the audio and click on words that don't match what you hear.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 p-4 bg-primary-50 rounded-md">
          <div className="flex items-start">
            <Info size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-primary-800">
              <p className="font-medium mb-2">Task Instructions</p>
              <ul className="space-y-1">
                <li>• Listen to the recording and read the text</li>
                <li>• Click on words that are different from what you hear</li>
                <li>• The text contains several incorrect words</li>
                <li>• You can listen to the recording multiple times</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Text with Words */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 p-6 rounded-lg"
        >
          <div className="text-lg leading-relaxed flex flex-wrap gap-2">
            {question.words.map((word) => {
              const isSelected = selectedWords.has(word.id);
              const isCorrectSelection = isSubmitted && word.isIncorrect === isSelected;
              const isIncorrectSelection = isSubmitted && word.isIncorrect !== isSelected;

              return (
                <span
                  key={word.id}
                  onClick={() => handleWordClick(word.id)}
                  className={`cursor-pointer px-2 py-1 rounded transition-colors ${
                    isSubmitted
                      ? isCorrectSelection
                        ? word.isIncorrect
                          ? 'bg-success-100 text-success-700'
                          : 'text-gray-900'
                        : isIncorrectSelection
                        ? 'bg-error-100 text-error-700'
                        : 'text-gray-900'
                      : isSelected
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  {word.text}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Actions */}
        <div className="mt-6">
          {isSubmitted ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Your Score</h3>
                  <p className="text-gray-600">
                    {question.words.filter(
                      (word) => word.isIncorrect === selectedWords.has(word.id)
                    ).length}{' '}
                    out of {question.words.length} correct
                  </p>
                </div>
                <div className="text-3xl font-bold text-primary-600">{calculateScore()}%</div>
              </div>
              <Button
                onClick={handleReset}
                variant="outline"
                className="mt-4"
                iconLeft={<RefreshCw size={16} />}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                variant="primary"
                disabled={!hasListened}
                iconLeft={<Check size={16} />}
              >
                Submit Answer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightIncorrectWords;