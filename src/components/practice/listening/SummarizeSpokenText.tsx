import { useState, useRef } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Play, Pause, Save, AlertTriangle, Info } from 'lucide-react';

type SummarizeSpokenTextProps = {
  question: {
    id: number;
    audio_url: string;
    time_limit: number;
  };
  onComplete: (response: string) => void;
};

const SummarizeSpokenText: React.FC<SummarizeSpokenTextProps> = ({ question, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [notes, setNotes] = useState('');
  const [answer, setAnswer] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const minWords = 50;
  const maxWords = 70;
  const timeLimit = question.time_limit || 600; // 10 minutes in seconds

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
      setHasListened(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setHasListened(true);
  };

  const handleTimeUp = () => {
    setIsTimeUp(true);
    handleSubmit();
  };

  const handleSubmit = () => {
    onComplete(answer);
    setIsSaved(true);
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word !== '').length;
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswer = e.target.value;
    setAnswer(newAnswer);
    setWordCount(countWords(newAnswer));
  };

  const getWordCountColor = () => {
    if (wordCount < minWords) return 'text-error-600';
    if (wordCount > maxWords) return 'text-error-600';
    return 'text-success-600';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Summarize Spoken Text</h2>
          <div className="flex space-x-3">
            <Timer
              initialTime={timeLimit}
              onComplete={handleTimeUp}
              variant={timeLimit <= 60 ? 'danger' : 'default'}
              size="md"
              labelPosition="left"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Listen to the audio</h3>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 flex flex-col items-center">
                <audio 
                  ref={audioRef}
                  src={question.audio_url} 
                  onEnded={handleAudioEnded}
                  className="w-full mb-3" 
                  controls={false}
                />
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                
                <Button
                  onClick={togglePlayPause}
                  variant="primary"
                  iconLeft={isPlaying ? <Pause size={16} /> : <Play size={16} />}
                >
                  {isPlaying ? 'Pause' : hasListened ? 'Play Again' : 'Play Audio'}
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes (optional)
              </label>
              <textarea
                id="notes"
                rows={6}
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 resize-none"
                placeholder="Take notes while listening..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">
                These notes are for your reference only and won't be submitted.
              </p>
            </div>
          </div>
          
          <div>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                  Your Summary
                </label>
                <div className={`text-sm font-medium ${getWordCountColor()}`}>
                  {wordCount}/{minWords}-{maxWords} words
                </div>
              </div>
              
              <textarea
                id="answer"
                rows={10}
                className={`block w-full rounded-md border ${
                  wordCount < minWords || wordCount > maxWords
                    ? 'border-error-300 focus:border-error-500 focus:ring-error-500'
                    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                } shadow-sm p-3 resize-none`}
                placeholder="Write your summary here..."
                value={answer}
                onChange={handleAnswerChange}
                disabled={isTimeUp || isSaved}
              ></textarea>
              
              {(wordCount < minWords || wordCount > maxWords) && (
                <div className="mt-2 flex items-start text-sm text-error-600">
                  <AlertTriangle size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                  <span>
                    {wordCount < minWords
                      ? `Your summary must be at least ${minWords} words.`
                      : `Your summary must not exceed ${maxWords} words.`}
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-3 bg-primary-50 rounded-md mb-4">
              <div className="flex items-start">
                <Info size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-800">
                  <p className="font-medium mb-1">Task</p>
                  <p>
                    You will hear a short lecture. Write a summary for a fellow student who was not present.
                    Your summary should be 50-70 words. You have 10 minutes to finish this task.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                variant="primary"
                iconLeft={<Save size={16} />}
                disabled={!hasListened || wordCount < minWords || wordCount > maxWords || isSaved}
              >
                {isSaved ? 'Saved' : 'Save Response'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizeSpokenText;