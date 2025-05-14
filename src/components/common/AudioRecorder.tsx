import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, RotateCcw } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import Button from './Button';

type AudioRecorderProps = {
  onRecordingComplete?: (audioBlob: Blob) => void;
  maxDuration?: number; // in seconds
  showWaveform?: boolean;
  className?: string;
  autoStopRecording?: boolean;
};

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  maxDuration = 40,
  showWaveform = true,
  className = '',
  autoStopRecording = true,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize WaveSurfer
  useEffect(() => {
    if (showWaveform && waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4B5563',
        progressColor: '#3B82F6',
        cursorColor: 'transparent',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 0,
        height: 50,
        barGap: 3,
      });

      wavesurferRef.current.on('finish', () => {
        setIsPlaying(false);
      });
    }

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [showWaveform]);

  // Load recorded audio into WaveSurfer
  useEffect(() => {
    if (audioUrl && wavesurferRef.current) {
      wavesurferRef.current.load(audioUrl);
    }
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        if (onRecordingComplete) {
          onRecordingComplete(audioBlob);
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prevTime) => {
          const newTime = prevTime + 1;
          if (autoStopRecording && newTime >= maxDuration) {
            stopRecording();
          }
          return newTime;
        });
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      streamRef.current?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const playAudio = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    setAudioUrl(null);
    setRecordingTime(0);
    setIsPlaying(false);
    if (wavesurferRef.current) {
      wavesurferRef.current.empty();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-700">
          {isRecording ? 'Recording...' : audioUrl ? 'Recording complete' : 'Ready to record'}
        </div>
        <div className="text-sm font-medium">
          {isRecording ? (
            <span className="text-error-600 animate-pulse">{formatTime(recordingTime)} / {formatTime(maxDuration)}</span>
          ) : (
            <span className="text-gray-500">{formatTime(recordingTime)}</span>
          )}
        </div>
      </div>
      
      {showWaveform && (
        <div
          ref={waveformRef}
          className={`w-full h-16 bg-gray-50 rounded-md mb-4 ${
            isRecording ? 'border border-error-500 animate-pulse' : 'border border-gray-200'
          }`}
        ></div>
      )}
      
      <div className="flex space-x-3">
        {!audioUrl ? (
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? 'danger' : 'primary'}
            iconLeft={isRecording ? <Square size={16} /> : <Mic size={16} />}
            fullWidth
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
        ) : (
          <>
            <Button
              onClick={isPlaying ? pauseAudio : playAudio}
              variant="secondary"
              iconLeft={isPlaying ? <Square size={16} /> : <Play size={16} />}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              onClick={resetRecording}
              variant="outline"
              iconLeft={<RotateCcw size={16} />}
            >
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;