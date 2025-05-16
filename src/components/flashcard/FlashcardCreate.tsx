import { useState } from 'react';
import { Plus, Image, Volume2, Trash2 } from 'lucide-react';
import Button from '../common/Button';
import type { Flashcard } from '../../types/flashcard';

interface FlashcardCreateProps {
  onSave: (card: Omit<Flashcard, 'id'>) => void;
  onCancel: () => void;
}

const FlashcardCreate: React.FC<FlashcardCreateProps> = ({ onSave, onCancel }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [imageUrl, setImageUrl] = useState<string>();
  const [audioUrl, setAudioUrl] = useState<string>();
  const [difficulty, setDifficulty] = useState<Flashcard['difficulty']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      front,
      back,
      imageUrl,
      audioUrl,
      difficulty,
      timesReviewed: 0,
      correctReviews: 0,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-medium p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="front" className="block text-sm font-medium text-gray-700 mb-1">
            Front (Question/Term)
          </label>
          <textarea
            id="front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            className="w-full h-24 p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter the question or term..."
            required
          />
        </div>

        <div>
          <label htmlFor="back" className="block text-sm font-medium text-gray-700 mb-1">
            Back (Answer/Definition)
          </label>
          <textarea
            id="back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            className="w-full h-24 p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter the answer or definition..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (optional)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                id="image"
                value={imageUrl || ''}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://..."
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setImageUrl(undefined)}
                disabled={!imageUrl}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 max-h-32 rounded-md object-contain"
              />
            )}
          </div>

          <div>
            <label htmlFor="audio" className="block text-sm font-medium text-gray-700 mb-1">
              Audio URL (optional)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                id="audio"
                value={audioUrl || ''}
                onChange={(e) => setAudioUrl(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://..."
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setAudioUrl(undefined)}
                disabled={!audioUrl}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            {audioUrl && (
              <audio controls className="mt-2 w-full">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Flashcard['difficulty'])}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" iconLeft={<Plus size={16} />}>
            Create Card
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FlashcardCreate;