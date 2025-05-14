import { useState, useRef } from 'react';
import Button from '../../common/Button';
import AudioRecorder from '../../common/AudioRecorder';
import Timer from '../../common/Timer';
import { Play, Info } from 'lucide-react';

type AnswerShortQuestionProps = {
  question: {
    id: number;
    audio_url: string;
    time_limit: number;
  };
  onComplete: (audioBlob: Blob) => void;
};

const AnswerShortQuestion: React.FC<AnswerShortQuestionProps> = ({ question, onComplete }) => {
  const [hasListened, setHasListened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState<'listening' | 'recording' | 'completed'>('listening');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setHasListened(true);
    setStage('recording');
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    setStage('completed');
    onComplete(audioBlob);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Answer Short Question</h2>
          {stage === 'recording' && (
            <Timer
              initialTime={10}
              onComplete={() => setStage('completed')}
              variant="warning"
              size="md"
              labelPosition="left"
            />
          )}
        </div>

        <div className="space-y-6">
          {/* Audio Player Section */}
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
                onClick={handlePlayAudio}
                variant="primary"
                size="lg"
                disabled={isPlaying || stage !== 'listening'}
                iconLeft={<Play size={20} />}
              >
                {hasListened ? 'Play Question Again' : 'Play Question'}
              </Button>
              
              {!hasListened && (
                <p className="mt-3 text-sm text-gray-600">
                  Listen to the question carefully. You will need to provide a short answer.
                </p>
              )}
            </div>
          </div>

          {/* Recording Section */}
          {stage !== 'listening' && (
            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="mb-4 text-center">
                <p className="text-lg font-medium text-gray-800">
                  {stage === 'recording' ? 'Answer the question' : 'Recording completed'}
                </p>
                <p className="text-sm text-gray-600">
                  {stage === 'recording' 
                    ? 'Provide a brief, direct answer' 
                    : 'You can try again if needed'}
                </p>
              </div>
              
              <AudioRecorder
                onRecordingComplete={handleRecordingComplete}
                maxDuration={10}
                showWaveform
                autoStopRecording
              />
            </div>
          )}

          {/* Instructions */}
          <div className="p-4 bg-primary-50 rounded-md">
            <div className="flex items-start">
              <Info size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-primary-800">
                <p className="font-medium mb-2">Task Instructions</p>
                <ul className="space-y-1">
                  <li>• Listen to the question carefully</li>
                  <li>• Answer with a single word or short phrase</li>
                  <li>• Speak clearly and naturally</li>
                  <li>• You have 10 seconds to respond</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Tips for Success</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Focus on the key information in the question</li>
              <li>• Keep your answer concise and relevant</li>
              <li>• Use appropriate vocabulary</li>
              <li>• Maintain good pronunciation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerShortQuestion;