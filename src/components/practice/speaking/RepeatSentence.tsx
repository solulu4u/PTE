import { useState, useRef } from 'react';
import Button from '../../common/Button';
import AudioRecorder from '../../common/AudioRecorder';
import Timer from '../../common/Timer';
import { Play, Info } from 'lucide-react';

type RepeatSentenceProps = {
  question: {
    id: number;
    audio_url: string;
    time_limit: number;
  };
  onComplete: (audioBlob: Blob) => void;
};

const RepeatSentence: React.FC<RepeatSentenceProps> = ({ question, onComplete }) => {
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
          <h2 className="text-xl font-semibold text-gray-900">Repeat Sentence</h2>
          {stage === 'listening' && (
            <Timer
              initialTime={10}
              onComplete={() => setStage('recording')}
              variant={hasListened ? 'warning' : 'default'}
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
                disabled={isPlaying}
                iconLeft={<Play size={20} />}
              >
                {hasListened ? 'Play Again' : 'Play Audio'}
              </Button>
              
              {!hasListened && (
                <p className="mt-3 text-sm text-gray-600">
                  Listen carefully. You will need to repeat this sentence.
                </p>
              )}
            </div>
          </div>

          {/* Recording Section */}
          {stage !== 'listening' && (
            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="mb-4 text-center">
                <p className="text-lg font-medium text-gray-800">
                  {stage === 'recording' ? 'Repeat the sentence you heard' : 'Recording completed'}
                </p>
                <p className="text-sm text-gray-600">
                  {stage === 'recording' ? 'Speak clearly and naturally' : 'You can try again if needed'}
                </p>
              </div>
              
              <AudioRecorder
                onRecordingComplete={handleRecordingComplete}
                maxDuration={15}
                showWaveform
                autoStopRecording
              />
            </div>
          )}

          {/* Instructions */}
          <div className="p-3 bg-primary-50 rounded-md">
            <div className="flex items-start">
              <Info size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-primary-800">
                <p className="font-medium mb-1">Task Instructions</p>
                <p>
                  You will hear a sentence. Listen carefully and repeat the sentence exactly as you hear it.
                  You will have 15 seconds to respond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepeatSentence;