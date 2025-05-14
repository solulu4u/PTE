import { useState } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Info, Check, RefreshCw, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Option = {
  id: string;
  text: string;
};

type Blank = {
  id: string;
  correctOptionId: string;
  selectedOptionId?: string;
};

type ReadingWritingFillBlanksProps = {
  question: {
    id: number;
    passage: string;
    blanks: Blank[];
    options: Option[];
    time_limit: number;
  };
  onComplete: (answers: { [key: string]: string }) => void;
};

const ReadingWritingFillBlanks: React.FC<ReadingWritingFillBlanksProps> = ({ question, onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const handleOptionSelect = (blankId: string, optionId: string) => {
    if (isSubmitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [blankId]: optionId,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete(selectedAnswers);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const calculateScore = () => {
    const correctAnswers = question.blanks.filter(
      (blank) => selectedAnswers[blank.id] === blank.correctOptionId
    ).length;
    return Math.round((correctAnswers / question.blanks.length) * 100);
  };

  const renderPassageWithBlanks = () => {
    const parts = question.passage.split(/\[\[(\d+)\]\]/);
    
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        return <span key={index}>{part}</span>;
      }

      const blankIndex = parseInt(part, 10) - 1;
      const blank = question.blanks[blankIndex];
      
      if (!blank) return null;

      const selectedOption = question.options.find(
        (opt) => opt.id === selectedAnswers[blank.id]
      );
      const correctOption = question.options.find(
        (opt) => opt.id === blank.correctOptionId
      );

      return (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block"
        >
          {isSubmitted ? (
            <span
              className={`inline-block px-3 py-1 mx-1 rounded ${
                selectedAnswers[blank.id] === blank.correctOptionId
                  ? 'bg-success-50 text-success-700 border border-success-200'
                  : 'bg-error-50 text-error-700 border border-error-200'
              }`}
            >
              {selectedOption ? selectedOption.text : '_____'}
              {selectedAnswers[blank.id] !== blank.correctOptionId && (
                <span className="ml-1 text-success-600">({correctOption?.text})</span>
              )}
            </span>
          ) : (
            <select
              value={selectedAnswers[blank.id] || ''}
              onChange={(e) => handleOptionSelect(blank.id, e.target.value)}
              className={`inline-block px-3 py-1 mx-1 rounded border ${
                selectedAnswers[blank.id]
                  ? 'border-primary-300 bg-primary-50'
                  : 'border-gray-300 bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            >
              <option value="">Select word</option>
              {question.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.text}
                </option>
              ))}
            </select>
          )}
        </motion.span>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Reading & Writing: Fill in the Blanks</h2>
          {!isSubmitted && (
            <Timer
              initialTime={question.time_limit}
              onComplete={() => {
                setIsTimeUp(true);
                handleSubmit();
              }}
              variant="default"
              size="md"
              labelPosition="left"
            />
          )}
        </div>

        {/* Instructions */}
        <div className="mb-6 p-4 bg-primary-50 rounded-md">
          <div className="flex items-start">
            <Info size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-primary-800">
              <p className="font-medium mb-2">Task Instructions</p>
              <ul className="space-y-1">
                <li>• Read the text carefully</li>
                <li>• Select the most appropriate word for each blank</li>
                <li>• Consider both grammar and meaning when making your choices</li>
                <li>• Fill all blanks to complete the task</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Score Display */}
        {isSubmitted && (
          <div className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Your Score</h3>
                <p className="text-gray-600">
                  {question.blanks.filter(
                    (blank) => selectedAnswers[blank.id] === blank.correctOptionId
                  ).length}{' '}
                  out of {question.blanks.length} correct
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
        )}

        {/* Main Content */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-800 leading-relaxed">{renderPassageWithBlanks()}</p>
          </div>
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {Object.keys(selectedAnswers).length} of {question.blanks.length} blanks filled
            </div>
            <Button
              onClick={handleSubmit}
              variant="primary"
              disabled={Object.keys(selectedAnswers).length !== question.blanks.length}
              iconLeft={<Check size={16} />}
            >
              Submit Answers
            </Button>
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Reading Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Read the entire text first to understand the context</li>
            <li>• Pay attention to grammar structures</li>
            <li>• Look for context clues around each blank</li>
            <li>• Consider collocations and common phrases</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReadingWritingFillBlanks;