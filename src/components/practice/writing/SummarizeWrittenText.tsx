import { useState, useRef, useEffect } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Save, Info, AlertTriangle } from 'lucide-react';

type SummarizeWrittenTextProps = {
  question: {
    id: number;
    content: string;
    time_limit: number;
  };
  onComplete: (response: string) => void;
};

const SummarizeWrittenText: React.FC<SummarizeWrittenTextProps> = ({ question, onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const minWords = 5;
  const maxWords = 75;
  const timeLimit = question.time_limit || 600; // 10 minutes in seconds

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const words = answer.trim().split(/\s+/).filter(word => word !== '');
    setWordCount(words.length);
  }, [answer]);

  const handleTimeUp = () => {
    setIsTimeUp(true);
    handleSubmit();
  };

  const handleSubmit = () => {
    onComplete(answer);
    setIsSaved(true);
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
          <h2 className="text-xl font-semibold text-gray-900">Summarize Written Text</h2>
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
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 h-full overflow-auto">
              <p className="text-gray-800 leading-relaxed">{question.content}</p>
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
              
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  id="answer"
                  rows={10}
                  className={`block w-full rounded-md border ${
                    wordCount < minWords || wordCount > maxWords
                      ? 'border-error-300 focus:border-error-500 focus:ring-error-500'
                      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                  } shadow-sm p-3 resize-none`}
                  placeholder="Write your summary here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
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
            </div>
            
            <div className="p-3 bg-primary-50 rounded-md mb-4">
              <div className="flex items-start">
                <Info size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-800">
                  <p className="font-medium mb-1">Task</p>
                  <p>
                    Write a one-sentence summary of the text above. Your summary must be between 5-75 words in length.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                variant="primary"
                iconLeft={<Save size={16} />}
                disabled={wordCount < minWords || wordCount > maxWords || isSaved}
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

export default SummarizeWrittenText;