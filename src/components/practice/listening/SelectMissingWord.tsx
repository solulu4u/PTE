import { useState, useRef } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Play, Pause, Check, RefreshCw, Info } from 'lucide-react';
import { motion } from 'framer-motion';

type Option = {
  id: string;
  text: string;
};

type SelectMissingWordProps = {
  question: {
    id: number;
    audio_url: string;
    options: Option[];
    correctOptionId: string;
    time_limit: number;
  };
  onComplete: (selectedOptionId: string) => void;
};

const SelectMissingWord: React.FC<SelectMissingWordProps> = ({ question, onComplete }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
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

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmit = () => {
    if (selectedOptionId) {
      setIsSubmitted(true);
      onComplete(selectedOptionId);
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setHasListened(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const getOptionClassName = (optionId: string) => {
    const baseClasses = 'relative flex items-center p-4 rounded-lg border transition-colors';
    
    if (!isSubmitted) {
      return `${baseClasses} ${
        selectedOptionId === optionId
          ? 'bg-primary-50 border-primary-500'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      }`;
    }

    if (optionId === question.correctOptionId) {
      return `${baseClasses} bg-success-50 border-success-500`;
    }
    if (selectedOptionId === optionId) {
      return `${baseClasses} bg-error-50 border-error-500`;
    }
    return `${baseClasses} bg-white border-gray-200 opacity-50`;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Select Missing Word</h2>
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
                  Listen carefully. The last word is missing. Select the word that best completes the audio.
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
                <li>• Listen to the audio recording</li>
                <li>• The last word is missing</li>
                <li>• Select the word that best completes the recording</li>
                <li>• You can listen to the recording multiple times</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionSelect(option.id)}
              className={`${getOptionClassName(option.id)} cursor-pointer`}
            >
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900">{option.text}</p>
              </div>
              {selectedOptionId === option.id && !isSubmitted && (
                <div className="absolute right-4">
                  <div className="w-4 h-4 rounded-full bg-primary-500" />
                </div>
              )}
              {isSubmitted && option.id === question.correctOptionId && (
                <Check className="absolute right-4 w-5 h-5 text-success-500" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6">
          {isSubmitted ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Result</h3>
                  <p className="text-gray-600">
                    {selectedOptionId === question.correctOptionId
                      ? 'Correct! Well done!'
                      : 'Incorrect. Try again!'}
                  </p>
                </div>
                <div className="text-3xl font-bold text-primary-600">
                  {selectedOptionId === question.correctOptionId ? '100%' : '0%'}
                </div>
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
                disabled={!selectedOptionId || !hasListened}
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

export default SelectMissingWord;