import { useState, useRef } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Play, Pause, Check, RefreshCw, Info } from 'lucide-react';
import { motion } from 'framer-motion';

type WriteFromDictationProps = {
  question: {
    id: number;
    audio_url: string;
    correct_text: string;
    time_limit: number;
  };
  onComplete: (answer: string) => void;
};

const WriteFromDictation: React.FC<WriteFromDictationProps> = ({ question, onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const maxPlays = 2;

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setPlayCount((prev) => prev + 1);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setHasListened(true);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete(answer);
  };

  const handleReset = () => {
    setAnswer('');
    setIsSubmitted(false);
    setHasListened(false);
    setPlayCount(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const calculateScore = () => {
    const userWords = answer.toLowerCase().trim().split(/\s+/);
    const correctWords = question.correct_text.toLowerCase().trim().split(/\s+/);
    
    let correctCount = 0;
    userWords.forEach((word, index) => {
      if (index < correctWords.length && word === correctWords[index]) {
        correctCount++;
      }
    });

    return Math.round((correctCount / correctWords.length) * 100);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Write from Dictation</h2>
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
                disabled={playCount >= maxPlays}
              >
                {isPlaying ? 'Pause Audio' : hasListened ? `Play Again (${maxPlays - playCount} left)` : 'Play Audio'}
              </Button>
              
              {!hasListened && (
                <p className="mt-3 text-sm text-gray-600">
                  Listen carefully and write exactly what you hear. You can play the audio {maxPlays} times.
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
                <li>• Type exactly what you hear</li>
                <li>• Pay attention to spelling and punctuation</li>
                <li>• You can play the recording {maxPlays} times</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Answer Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isSubmitted}
            className={`w-full h-32 p-4 border rounded-lg ${
              isSubmitted
                ? 'bg-gray-50 border-gray-200'
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
            }`}
            placeholder="Type what you hear..."
          />
        </motion.div>

        {/* Actions */}
        <div className="mt-6">
          {isSubmitted ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Your Score</h3>
                  <p className="text-gray-600">
                    Accuracy: {calculateScore()}%
                  </p>
                </div>
                <div className="text-3xl font-bold text-primary-600">{calculateScore()}%</div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Correct Text:</h4>
                <p className="text-success-600 bg-success-50 p-3 rounded">
                  {question.correct_text}
                </p>
                
                <h4 className="font-medium text-gray-900 mt-4 mb-2">Your Answer:</h4>
                <p className="text-gray-800 bg-gray-50 p-3 rounded">
                  {answer}
                </p>
              </div>
              
              <Button
                onClick={handleReset}
                variant="outline"
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
                disabled={!answer.trim() || !hasListened}
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

export default WriteFromDictation;