import { useState } from 'react';
import Button from '../../common/Button';
import Timer from '../../common/Timer';
import { Info, Check, RefreshCw } from 'lucide-react';

type Option = {
  id: string;
  text: string;
};

type Question = {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
};

type MultipleChoiceQuestionsProps = {
  question: {
    id: number;
    passage: string;
    questions: Question[];
    time_limit: number;
  };
  onComplete: (answers: { [key: string]: string }) => void;
};

const MultipleChoiceQuestions: React.FC<MultipleChoiceQuestionsProps> = ({ question, onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
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
    const correctAnswers = question.questions.filter(
      (q) => selectedAnswers[q.id] === q.correctOptionId
    ).length;
    return Math.round((correctAnswers / question.questions.length) * 100);
  };

  const getOptionClassName = (questionId: string, optionId: string) => {
    const baseClasses = 'relative flex items-start p-4 rounded-lg border transition-colors';
    
    if (!isSubmitted) {
      return `${baseClasses} ${
        selectedAnswers[questionId] === optionId
          ? 'bg-primary-50 border-primary-500'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      }`;
    }

    const isSelected = selectedAnswers[questionId] === optionId;
    const isCorrect = optionId === question.questions.find(q => q.id === questionId)?.correctOptionId;

    if (isCorrect) {
      return `${baseClasses} bg-success-50 border-success-500`;
    }
    if (isSelected && !isCorrect) {
      return `${baseClasses} bg-error-50 border-error-500`;
    }
    return `${baseClasses} bg-white border-gray-200 opacity-50`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Multiple Choice Questions</h2>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reading Passage */}
          <div>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-800 whitespace-pre-line">{question.passage}</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-primary-50 rounded-md">
              <div className="flex items-start">
                <Info size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-800">
                  <p className="font-medium mb-2">Task Instructions</p>
                  <ul className="space-y-1">
                    <li>• Read the passage carefully</li>
                    <li>• Answer all questions based on the information in the passage</li>
                    <li>• Select the best answer for each question</li>
                    <li>• You can refer back to the passage while answering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div>
            {isSubmitted && (
              <div className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Your Score</h3>
                    <p className="text-gray-600">
                      {question.questions.filter(
                        (q) => selectedAnswers[q.id] === q.correctOptionId
                      ).length}{' '}
                      out of {question.questions.length} correct
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

            <div className="space-y-6">
              {question.questions.map((q, index) => (
                <div key={q.id} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-base font-medium text-gray-900 mb-4">
                    {index + 1}. {q.text}
                  </h3>
                  <div className="space-y-2">
                    {q.options.map((option) => (
                      <div
                        key={option.id}
                        className={getOptionClassName(q.id, option.id)}
                        onClick={() => handleOptionSelect(q.id, option.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{option.text}</p>
                        </div>
                        {selectedAnswers[q.id] === option.id && !isSubmitted && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="w-4 h-4 rounded-full bg-primary-500" />
                          </div>
                        )}
                        {isSubmitted && option.id === q.correctOptionId && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Check className="w-5 h-5 text-success-500" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {!isSubmitted && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  disabled={
                    Object.keys(selectedAnswers).length !== question.questions.length
                  }
                >
                  Submit Answers
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestions;