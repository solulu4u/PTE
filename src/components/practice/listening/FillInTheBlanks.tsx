import { useState, useRef } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Play, Pause, Check, RefreshCw, Info } from 'lucide-react';
import { motion } from 'framer-motion';

type Blank = {
  id: string;
  answer: string;
  userAnswer?: string;
};

type FillInTheBlanksProps = {
  question: {
    id: number;
    audio_url: string;
    text: string;
    blanks: Blank[];
    time_limit: number;
  };
  onComplete: (answers: { [key: string]: string }) => void;
};

const FillInTheBlanks: React.FC<FillInTheBlanksProps> = ({ question, onComplete }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
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

  const handleAnswerChange = (blankId: string, value: string) => {
    if (isSubmitted) return;
    
    setAnswers((prev) => ({
      ...prev,
      [blankId]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete(answers);
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setHasListened(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const calculateScore = () => {
    const correctAnswers = question.blanks.filter(
      (blank) => answers[blank.id]?.toLowerCase().trim() === blank.answer.toLowerCase().trim()
    ).length;
    return Math.round((correctAnswers / question.blanks.length) * 100);
  };

  const renderText = () => {
    const parts = question.text.split(/\[\[(\d+)\]\]/);
    
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        return <span key={index}>{part}</span>;
      }

      const blankIndex = parseInt(part, 10) - 1;
      const blank = question.blanks[blankIndex];
      
      if (!blank) return null;

      const isCorrect = answers[blank.id]?.toLowerCase().trim() === blank.answer.toLowerCase().trim();

      return (
        <input
          key={blank.id}
          type="text"
          value={answers[blank.id] || ''}
          onChange={(e) => handleAnswerChange(blank.id, e.target.value)}
          disabled={isSubmitted}
          className={`inline-block w-32 px-2 py-1 mx-1 text-center border rounded ${
            isSubmitted
              ? isCorrect
                ? 'bg-success-50 border-success-500 text-success-700'
                : 'bg-error-50 border-error-500 text-error-700'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
          }`}
          placeholder="Type answer"
        />
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Fill in the Blanks</h2>
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
                  Listen to the audio carefully and fill in the missing words.
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
                <li>• Type the missing words in the blanks</li>
                <li>• Pay attention to spelling</li>
                <li>• You can listen to the recording multiple times</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Text with Blanks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 p-6 rounded-lg text-lg leading-relaxed"
        >
          {renderText()}
        </motion.div>

        {/* Actions */}
        <div className="mt-6">
          {isSubmitted ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Your Score</h3>
                  <p className="text-gray-600">
                    {question.blanks.filter(
                      (blank) => answers[blank.id]?.toLowerCase().trim() === blank.answer.toLowerCase().trim()
                    ).length}{' '}
                    out of {question.blanks.length} correct
                  </p>
                </div>
                <div className="text-3xl font-bold text-primary-600">{calculateScore()}%</div>
              </div>
              
              {/* Show Correct Answers */}
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-900">Correct Answers:</h4>
                {question.blanks.map((blank, index) => (
                  <div key={blank.id} className="flex items-center text-sm">
                    <span className="w-8 text-gray-500">#{index + 1}:</span>
                    <span className="font-medium text-success-600">{blank.answer}</span>
                    {answers[blank.id]?.toLowerCase().trim() !== blank.answer.toLowerCase().trim() && (
                      <span className="ml-2 text-error-600">
                        (Your answer: {answers[blank.id] || 'blank'})
                      </span>
                    )}
                  </div>
                ))}
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
                disabled={Object.keys(answers).length !== question.blanks.length}
                iconLeft={<Check size={16} />}
              >
                Submit Answers
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FillInTheBlanks;