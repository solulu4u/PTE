import { useState, useEffect } from 'react';
import Button from '../../common/Button';
import AudioRecorder from '../../common/AudioRecorder';
import Timer from '../../common/Timer';
import { ExternalLink } from 'lucide-react';

type ReadAloudProps = {
  question: {
    id: number;
    content: string;
    time_limit: number;
  };
  onComplete: (audioBlob: Blob) => void;
};

const ReadAloud: React.FC<ReadAloudProps> = ({ question, onComplete }) => {
  const [stage, setStage] = useState<'preparation' | 'recording' | 'completed'>('preparation');
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const preparationTime = 30; // seconds

  useEffect(() => {
    if (isTimerComplete && stage === 'preparation') {
      setStage('recording');
    }
  }, [isTimerComplete, stage]);

  const handleRecordingComplete = (audioBlob: Blob) => {
    setStage('completed');
    onComplete(audioBlob);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Read Aloud</h2>
          <div className="flex space-x-3">
            {stage === 'preparation' && (
              <Timer 
                initialTime={preparationTime}
                onComplete={() => setIsTimerComplete(true)}
                variant="warning"
                size="md"
                labelPosition="left"
              />
            )}
            <Button
              variant="outline"
              size="sm"
              iconRight={<ExternalLink size={16} />}
            >
              Instructions
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-gray-800 text-lg leading-relaxed">{question.content}</p>
          </div>
        </div>
        
        {stage === 'preparation' && (
          <div className="text-center">
            <div className="mb-6 bg-primary-50 text-primary-800 p-4 rounded-lg">
              <p className="font-medium">Preparation Time</p>
              <p className="text-sm mt-1">Read the text silently. Recording will start automatically when the timer finishes.</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setStage('recording')}
            >
              I'm Ready to Record
            </Button>
          </div>
        )}
        
        {stage === 'recording' && (
          <div className="bg-gray-50 p-5 rounded-lg">
            <div className="mb-4 text-center">
              <p className="text-lg font-medium text-gray-800">Read the text aloud</p>
              <p className="text-sm text-gray-600">Speak clearly and at a natural pace</p>
            </div>
            
            <AudioRecorder 
              onRecordingComplete={handleRecordingComplete}
              maxDuration={question.time_limit || 40}
              showWaveform
              autoStopRecording
            />
          </div>
        )}
        
        {stage === 'completed' && (
          <div className="bg-success-50 p-5 rounded-lg text-center">
            <p className="text-success-700 font-medium mb-2">Recording Complete!</p>
            <Button
              variant="primary"
              onClick={() => setStage('preparation')}
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadAloud;