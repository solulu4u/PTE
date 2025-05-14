import { useState } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Info, Check, RefreshCw, MoveUp, MoveDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Paragraph = {
  id: string;
  text: string;
  originalIndex: number;
};

type ReorderParagraphsProps = {
  question: {
    id: number;
    paragraphs: Paragraph[];
    time_limit: number;
  };
  onComplete: (orderedParagraphs: string[]) => void;
};

const ReorderParagraphs: React.FC<ReorderParagraphsProps> = ({ question, onComplete }) => {
  const [paragraphs, setParagraphs] = useState<Paragraph[]>(question.paragraphs);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const moveParagraph = (index: number, direction: 'up' | 'down') => {
    if (isSubmitted) return;

    const newParagraphs = [...paragraphs];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < paragraphs.length) {
      const temp = newParagraphs[index];
      newParagraphs[index] = newParagraphs[newIndex];
      newParagraphs[newIndex] = temp;
      setParagraphs(newParagraphs);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete(paragraphs.map(p => p.id));
  };

  const handleReset = () => {
    setParagraphs([...question.paragraphs]);
    setIsSubmitted(false);
  };

  const calculateScore = () => {
    const correctOrder = paragraphs.every((p, index) => p.originalIndex === index);
    return correctOrder ? 100 : 0;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Reorder Paragraphs</h2>
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
                <li>• The paragraphs below are in random order</li>
                <li>• Arrange them to form a coherent text</li>
                <li>• Use the up and down arrows to move paragraphs</li>
                <li>• Pay attention to connecting words and logical flow</li>
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
                  {calculateScore() === 100 ? 'Perfect order!' : 'Incorrect order'}
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

        {/* Paragraphs */}
        <div className="space-y-4">
          <AnimatePresence>
            {paragraphs.map((paragraph, index) => (
              <motion.div
                key={paragraph.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={`relative p-4 rounded-lg border ${
                  isSubmitted
                    ? paragraph.originalIndex === index
                      ? 'bg-success-50 border-success-500'
                      : 'bg-error-50 border-error-500'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-gray-900">{paragraph.text}</p>
                  </div>
                  {!isSubmitted && (
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveParagraph(index, 'up')}
                        disabled={index === 0}
                        className={`p-1 rounded hover:bg-gray-100 ${
                          index === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <MoveUp size={20} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => moveParagraph(index, 'down')}
                        disabled={index === paragraphs.length - 1}
                        className={`p-1 rounded hover:bg-gray-100 ${
                          index === paragraphs.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <MoveDown size={20} className="text-gray-600" />
                      </button>
                    </div>
                  )}
                  {isSubmitted && paragraph.originalIndex === index && (
                    <Check className="w-5 h-5 text-success-500" />
                  )}
                </div>
                {isSubmitted && paragraph.originalIndex !== index && (
                  <div className="mt-2 pt-2 border-t border-error-200">
                    <p className="text-sm text-error-600">
                      This paragraph should be {paragraph.originalIndex === 0 ? 'first' : 
                        paragraph.originalIndex === paragraphs.length - 1 ? 'last' : 
                        `in position ${paragraph.originalIndex + 1}`}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSubmit}
              variant="primary"
              iconLeft={<Check size={16} />}
            >
              Submit Answer
            </Button>
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Reading Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Look for topic sentences that introduce new ideas</li>
            <li>• Pay attention to transition words and phrases</li>
            <li>• Notice cause and effect relationships</li>
            <li>• Follow the logical progression of ideas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReorderParagraphs;