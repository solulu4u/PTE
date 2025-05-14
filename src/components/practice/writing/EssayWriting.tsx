import { useState, useEffect, useRef } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Save, Info, AlertTriangle } from 'lucide-react';

type EssayWritingProps = {
  question: {
    id: number;
    title: string;
    prompt: string;
    time_limit: number;
    min_words: number;
    max_words: number;
  };
  onComplete: (essay: string) => void;
};

const EssayWriting: React.FC<EssayWritingProps> = ({ question, onComplete }) => {
  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const minWords = question.min_words || 200;
  const maxWords = question.max_words || 300;
  const timeLimit = question.time_limit || 1200; // 20 minutes in seconds

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const words = essay.trim().split(/\s+/).filter(word => word !== '');
    setWordCount(words.length);
  }, [essay]);

  const handleTimeUp = () => {
    setIsTimeUp(true);
    handleSubmit();
  };

  const handleSubmit = () => {
    onComplete(essay);
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
          <h2 className="text-xl font-semibold text-gray-900">Essay Writing</h2>
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
          {/* Question Section */}
          <div>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">{question.title}</h3>
              <p className="text-gray-800 whitespace-pre-line">{question.prompt}</p>
            </div>

            <div className="mt-6 space-y-4">
              {/* Instructions */}
              <div className="p-4 bg-primary-50 rounded-md">
                <div className="flex items-start">
                  <Info size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-primary-800">
                    <p className="font-medium mb-2">Task Instructions</p>
                    <ul className="space-y-1">
                      <li>• Write a well-structured essay addressing all parts of the prompt</li>
                      <li>• Include an introduction, body paragraphs, and conclusion</li>
                      <li>• Stay within the word limit ({minWords}-{maxWords} words)</li>
                      <li>• You have {timeLimit / 60} minutes to complete this task</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Writing Tips */}
              <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Writing Tips</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Plan your essay before writing</li>
                  <li>• Use clear topic sentences</li>
                  <li>• Support your arguments with examples</li>
                  <li>• Use appropriate academic vocabulary</li>
                  <li>• Review your essay for errors if time permits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Writing Section */}
          <div>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="essay" className="block text-sm font-medium text-gray-700">
                  Your Essay
                </label>
                <div className={`text-sm font-medium ${getWordCountColor()}`}>
                  {wordCount}/{minWords}-{maxWords} words
                </div>
              </div>

              <textarea
                ref={textareaRef}
                id="essay"
                rows={20}
                className={`block w-full rounded-md border ${
                  wordCount < minWords || wordCount > maxWords
                    ? 'border-error-300 focus:border-error-500 focus:ring-error-500'
                    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                } shadow-sm p-3 resize-none font-sans text-base leading-relaxed`}
                placeholder="Write your essay here..."
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                disabled={isTimeUp || isSaved}
              />

              {(wordCount < minWords || wordCount > maxWords) && (
                <div className="mt-2 flex items-start text-sm text-error-600">
                  <AlertTriangle size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                  <span>
                    {wordCount < minWords
                      ? `Your essay must be at least ${minWords} words.`
                      : `Your essay must not exceed ${maxWords} words.`}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                variant="primary"
                iconLeft={<Save size={16} />}
                disabled={wordCount < minWords || wordCount > maxWords || isSaved}
              >
                {isSaved ? 'Saved' : 'Save Essay'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssayWriting;