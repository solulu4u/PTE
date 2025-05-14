import { useState } from 'react';
import Button from '../../common/Button';
import AudioRecorder from '../../common/AudioRecorder';
import Timer from '../../common/Timer';
import { Info, ZoomIn, ZoomOut } from 'lucide-react';

type DescribeImageProps = {
  question: {
    id: number;
    image_url: string;
    title?: string;
    description?: string;
    time_limit: number;
  };
  onComplete: (audioBlob: Blob) => void;
};

const DescribeImage: React.FC<DescribeImageProps> = ({ question, onComplete }) => {
  const [stage, setStage] = useState<'preparation' | 'recording' | 'completed'>('preparation');
  const [isZoomed, setIsZoomed] = useState(false);
  const preparationTime = 25; // seconds

  const handleRecordingComplete = (audioBlob: Blob) => {
    setStage('completed');
    onComplete(audioBlob);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-medium p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Describe Image</h2>
          {stage === 'preparation' && (
            <Timer
              initialTime={preparationTime}
              onComplete={() => setStage('recording')}
              variant="warning"
              size="md"
              labelPosition="left"
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <div>
            <div className="relative">
              <div className={`overflow-hidden rounded-lg border border-gray-200 ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}>
                <img
                  src={question.image_url}
                  alt={question.title || 'Image to describe'}
                  className={`w-full h-auto transition-transform duration-200 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  onClick={toggleZoom}
                />
              </div>
              <button
                onClick={toggleZoom}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
              >
                {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </button>
            </div>

            {question.title && (
              <h3 className="mt-3 text-lg font-medium text-gray-900">{question.title}</h3>
            )}
            {question.description && (
              <p className="mt-1 text-sm text-gray-600">{question.description}</p>
            )}
          </div>

          {/* Recording Section */}
          <div>
            {stage === 'preparation' ? (
              <div className="bg-primary-50 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-primary-900 mb-3">Preparation Time</h3>
                <ul className="space-y-2 text-primary-800">
                  <li>• Look at the image carefully</li>
                  <li>• Note the main features and trends</li>
                  <li>• Plan your description</li>
                  <li>• Recording will start automatically when time is up</li>
                </ul>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => setStage('recording')}
                >
                  I'm Ready to Record
                </Button>
              </div>
            ) : (
              <div className="bg-gray-50 p-5 rounded-lg">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {stage === 'recording' ? 'Describe the Image' : 'Recording Complete'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {stage === 'recording'
                      ? 'Speak clearly and provide a detailed description'
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
                  <p className="font-medium text-gray-900 mb-2">Speaking Checklist</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Introduce the image type</li>
                    <li>• Describe the main features</li>
                    <li>• Point out any significant trends or patterns</li>
                    <li>• Conclude with a summary or interpretation</li>
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

export default DescribeImage;