import { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Check, RefreshCw } from 'lucide-react';

// This is a simulated component that would need the proper dnd-kit libraries
// The actual implementation would use the proper drag-and-drop functionality

type WordOption = {
  id: string;
  text: string;
};

type Blank = {
  id: string;
  word: WordOption | null;
  correctWordId: string;
};

type FillInTheBlanksProps = {
  question: {
    id: number;
    content: string;
    time_limit: number;
    blanks: Array<{
      id: string;
      correctWordId: string;
    }>;
    wordOptions: WordOption[];
  };
  onComplete: (score: number) => void;
};

// This would be replaced with proper DnD implementation
const Draggable = ({ id, text, isDisabled = false }) => {
  return (
    <div 
      className={`px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 shadow-sm
        ${!isDisabled ? 'cursor-grab hover:bg-gray-50 hover:border-primary-300' : 'opacity-50 cursor-not-allowed'}`}
    >
      {text}
    </div>
  );
};

// This would be replaced with proper DnD implementation
const Droppable = ({ id, word, onDrop }) => {
  return (
    <button
      onClick={() => !word && onDrop(id)}
      className={`inline-block min-w-[100px] px-3 py-1 mx-1 border-b-2 ${
        word ? 'border-primary-500 bg-primary-50' : 'border-dashed border-gray-400 bg-gray-50'
      } text-center`}
    >
      {word ? word.text : '_______'}
    </button>
  );
};

const FillInTheBlanks: React.FC<FillInTheBlanksProps> = ({ question, onComplete }) => {
  const [blanks, setBlanks] = useState<Blank[]>([]);
  const [availableWords, setAvailableWords] = useState<WordOption[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Initialize blanks and available words
  useEffect(() => {
    if (question) {
      setBlanks(
        question.blanks.map((blank) => ({
          id: blank.id,
          word: null,
          correctWordId: blank.correctWordId,
        }))
      );
      setAvailableWords([...question.wordOptions]);
    }
  }, [question]);

  const handleDrop = (blankId: string, wordId: string) => {
    const word = availableWords.find((w) => w.id === wordId);
    if (!word) return;
    
    // Update blanks
    setBlanks((prev) =>
      prev.map((blank) => (blank.id === blankId ? { ...blank, word } : blank))
    );
    
    // Remove word from available words
    setAvailableWords((prev) => prev.filter((w) => w.id !== wordId));
  };

  const handleRemoveWord = (blankId: string) => {
    const blank = blanks.find((b) => b.id === blankId);
    if (!blank || !blank.word) return;
    
    // Add word back to available words
    setAvailableWords((prev) => [...prev, blank.word!]);
    
    // Remove word from blank
    setBlanks((prev) =>
      prev.map((b) => (b.id === blankId ? { ...b, word: null } : b))
    );
  };

  const handleSubmit = () => {
    // Calculate score
    const correct = blanks.filter((blank) => blank.word?.id === blank.correctWordId).length;
    const scoreValue = Math.round((correct / blanks.length) * 100);
    setScore(scoreValue);
    setSubmitted(true);
    onComplete(scoreValue);
  };

  const handleReset = () => {
    // Reset to initial state
    setAvailableWords([...question.wordOptions]);
    setBlanks(
      question.blanks.map((blank) => ({
        id: blank.id,
        word: null,
        correctWordId: blank.correctWordId,
      }))
    );
    setSubmitted(false);
  };

  // Replace placeholders in content with droppable elements
  const renderContent = () => {
    const parts = question.content.split(/\[\[(\d+)\]\]/);
    
    return parts.map((part, index) => {
      // If even index, it's text content
      if (index % 2 === 0) {
        return <span key={index}>{part}</span>;
      }
      
      // If odd index, it's a blank placeholder
      const blankIndex = parseInt(part, 10);
      const blank = blanks[blankIndex - 1];
      
      if (!blank) return null;
      
      return (
        <span key={index} className="inline-block">
          {submitted ? (
            <span 
              className={`inline-block px-3 py-1 mx-1 border-b-2 text-center ${
                blank.word?.id === blank.correctWordId
                  ? 'border-success-500 bg-success-50 text-success-700'
                  : 'border-error-500 bg-error-50 text-error-700'
              }`}
            >
              {blank.word ? blank.word.text : '_______'}
              {blank.word?.id !== blank.correctWordId && (
                <span className="ml-1 text-success-600">
                  ({question.wordOptions.find(w => w.id === blank.correctWordId)?.text})
                </span>
              )}
            </span>
          ) : (
            <span
              onClick={() => blank.word && handleRemoveWord(blank.id)}
              className={`inline-block min-w-[100px] px-3 py-1 mx-1 border-b-2 ${
                blank.word 
                  ? 'border-primary-500 bg-primary-50 cursor-pointer' 
                  : 'border-dashed border-gray-400 bg-gray-50'
              } text-center`}
            >
              {blank.word ? blank.word.text : '_______'}
            </span>
          )}
        </span>
      );
    });
  };

  // For demonstration, this simulates dragging a word to a blank
  const simulateDrag = (wordId: string) => {
    // Find the first empty blank
    const emptyBlank = blanks.find(blank => !blank.word);
    if (emptyBlank) {
      handleDrop(emptyBlank.id, wordId);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Reading: Fill in the Blanks</h2>
          {!submitted && (
            <Timer
              initialTime={question.time_limit || 300}
              size="md"
              labelPosition="left"
            />
          )}
        </div>

        <div className="mb-8">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-gray-800 text-lg leading-relaxed">
              {renderContent()}
            </p>
          </div>
        </div>
        
        {!submitted ? (
          <>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Available Words</h3>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word) => (
                  <div
                    key={word.id}
                    onClick={() => simulateDrag(word.id)}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-800 shadow-sm cursor-pointer hover:bg-gray-50 hover:border-primary-300"
                  >
                    {word.text}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Fill all blanks with the appropriate words.
              </div>
              <Button
                onClick={handleSubmit}
                variant="primary"
                disabled={blanks.some((blank) => !blank.word)}
                iconLeft={<Check size={16} />}
              >
                Submit Answer
              </Button>
            </div>
          </>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Result</h3>
                <p className="text-gray-600">
                  You got {blanks.filter(blank => blank.word?.id === blank.correctWordId).length} out
                  of {blanks.length} correct.
                </p>
              </div>
              <div className="text-3xl font-bold text-primary-600">{score}%</div>
            </div>
            <div className="mt-4">
              <Button
                onClick={handleReset}
                variant="outline"
                iconLeft={<RefreshCw size={16} />}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FillInTheBlanks;