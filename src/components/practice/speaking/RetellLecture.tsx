import { useState, useRef } from 'react';
import Button from '../../common/Button';
import AudioRecorder from '../../common/AudioRecorder';
import Timer from '../../common/Timer';
import { Play, Pause, Info, Edit3 } from 'lucide-react';

type RetellLectureProps = {
  question: {
    id: number;
    audio_url: string;
    video_url?: string;
    title?: string;
    time_limit: number;
  };
  onComplete: (audioBlob: Blob) => void;
};

const RetellLecture: React.FC<RetellLectureProps> = ({ question, onComplete }) => {
  const [stage, setStage] = useState<'listening' | 'preparation' | 'recording' | 'completed'>('listening');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [notes, setNotes] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const mediaRef = question.video_url ? videoRef : audioRef;
  const preparationTime = 10; // seconds

  const handlePlayPause = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMediaEnd = () => {
    setIsPlaying(false);
    setHasListened(true);
    setStage('preparation');
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    setStage('completed');
    onComplete(audioBlob);
  };

  const handleStartRecording = () => {
    setStage('recording');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Retell Lecture</h2>
          {stage === 'preparation' && (
            <Timer
              initialTime={preparationTime}
              onComplete={handleStartRecording}
              variant="warning"
              size="md"
              labelPosition="left"
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Media Player Section */}
          <div>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              {question.video_url ? (
                <video
                  ref={videoRef}
                  src={question.video_url}
                  className="w-full rounded-lg"
                  onEnded={handleMediaEnd}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ) : (
                <audio
                  ref={audioRef}
                  src={question.audio_url}
                  className="hidden"
                  onEnded={handleMediaEnd}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              )}

              <div className="mt-4 text-center">
                <Button
                  onClick={handlePlayPause}
                  variant="primary"
                  size="lg"
                  iconLeft={isPlaying ? <Pause size={20} /> : <Play size={20} />}
                >
                  {isPlaying ? 'Pause' : hasListened ? 'Play Again' : 'Play Lecture'}
                </Button>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <div className="flex items-center text-sm text-gray-500">
                  <Edit3 size={14} className="mr-1" />
                  Take notes while listening
                </div>
              </div>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Write your notes here..."
              />
            </div>
          </div>

          {/* Recording Section */}
          <div>
            {stage === 'listening' && (
              <div className="bg-primary-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-primary-900 mb-3">Listening Phase</h3>
                <ul className="space-y-2 text-primary-800">
                  <li>• Listen carefully to the lecture</li>
                  <li>• Take notes of key points</li>
                  <li>• You will have time to prepare after listening</li>
                </ul>
              </div>
            )}

            {stage === 'preparation' && (
              <div className="bg-warning-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-warning-900 mb-3">Preparation Time</h3>
                <ul className="space-y-2 text-warning-800">
                  <li>• Review your notes</li>
                  <li>• Organize your thoughts</li>
                  <li>• Plan your retelling</li>
                </ul>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={handleStartRecording}
                >
                  I'm Ready to Record
                </Button>
              </div>
            )}

            {(stage === 'recording' || stage === 'completed') && (
              <div className="bg-gray-50 p-5 rounded-lg">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {stage === 'recording' ? 'Retell the Lecture' : 'Recording Complete'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {stage === 'recording'
                      ? 'Provide a clear and concise summary of the lecture'
                      : 'You can try again if needed'}
                  </p>
                </div>

                <AudioRecorder
                  onRecordingComplete={handleRecordingComplete}
                  maxDuration={40}
                  showWaveform
                  autoStopRecording
                />
              </div>
            )}

            {/* Instructions */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <Info size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-2">Speaking Guidelines</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Introduce the main topic</li>
                    <li>• Cover key points in a logical order</li>
                    <li>• Include relevant details and examples</li>
                    <li>• Use clear transitions between ideas</li>
                    <li>• Conclude with a brief summary</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetellLecture;