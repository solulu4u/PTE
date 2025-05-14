import { useState } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Play, Pause, Check, RefreshCw, Info } from 'lucide-react';
import { motion } from 'framer-motion';

type Summary = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type HighlightCorrectSummaryProps = {
  question: {
    id: number;
    audio_url: string;
    summaries: Summary[];
    time_limit: number;
  };
  onComplete: (selectedSummaryId: string) => void;
};

const HighlightCorrectSummary: React.FC<HighlightCorrectSummaryProps> = ({ question, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [selectedSummaryId, setSelectedSummaryId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [audioElement] = useState(new Audio(question.audio_url));

  const handlePlayPause = () => {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setHasListened(true);
  };

  audioElement.onended = handleAudioEnd;

  const handleSummarySelect = (summaryId: string) => {
    if (isSubmitted) return;
    setSelectedSummaryId(summaryId);
  };

  const handleSubmit = () => {
    if (selectedSummaryId) {
      setIsSubmitted(true);
      onComplete(selectedSummaryId);
    }
  };

  const handleReset = () => {
    setSelectedSummaryId(null);
    setIsSubmitted(false);
    setHasListened(false);
    audioElement.currentTime = 0;
  };

  const getSummaryClassName = (summary: Summary) => {
    const baseClasses = 'p-4 rounded-lg border transition-all duration-200';
    
    if (!isSubmitted) {
      return `${baseClasses} ${
        selectedSummaryId === summary.id
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-200 bg-white hover:bg-gray-50'
      }`;
    }

    if (summary.isCorrect) {
      return `${baseClasses} border-success-500 bg-success-50`;
    }

    if (selectedSummaryId === summary.id && !summary.isCorrect) {
      return `${baseClasses} border-error-500 bg-error-50`;
    }

    return `${baseClasses} border-gray-200 bg-white opacity-50`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Highlight Correct Summary</h2>
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
                  Listen to the audio carefully. You will need to select the correct summary.
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
                <li>• Read all summaries carefully</li>
                <li>• Select the summary that best matches the recording</li>
                <li>• You can listen to the recording multiple times</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summaries */}
        <div className="space-y-4">
          {question.summaries.map((summary, index) => (
            <motion.div
              key={summary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSummarySelect(summary.id)}
              className={`${getSummaryClassName(summary)} cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">{String.fromCharCode(65 + index)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{summary.text}</p>
                </div>
                {isSubmitted && summary.isCorrect && (
                  <Check className="flex-shrink-0 w-5 h-5 text-success-500 mt-1" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-4">
          {isSubmitted ? (
            <Button
              onClick={handleReset}
              variant="outline"
              iconLeft={<RefreshCw size={16} />}
            >
              Try Again
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="primary"
              disabled={!selectedSummaryId || !hasListened}
              iconLeft={<Check size={16} />}
            >
              Submit Answer
            </Button>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Listening Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Focus on the main ideas in the recording</li>
            <li>• Take notes while listening</li>
            <li>• Pay attention to key words and phrases</li>
            <li>• Consider the overall message and purpose</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HighlightCorrectSummary;