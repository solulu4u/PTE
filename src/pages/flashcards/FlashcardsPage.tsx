import { useState } from 'react';
import { Plus, BookOpen, Layout, Settings } from 'lucide-react';
import Button from '../../components/common/Button';
import type { FlashcardDeck } from '../../types/flashcard';

const sampleDecks: FlashcardDeck[] = [
  {
    id: '1',
    title: 'PTE Vocabulary',
    description: 'Essential vocabulary for PTE Academic test',
    cards: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    authorId: '1',
    tags: ['vocabulary', 'pte', 'english'],
  },
  {
    id: '2',
    title: 'Common Phrases',
    description: 'Useful phrases for speaking tasks',
    cards: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    authorId: '1',
    tags: ['speaking', 'phrases', 'english'],
  },
];

const FlashcardsPage = () => {
  const [decks, setDecks] = useState<FlashcardDeck[]>(sampleDecks);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="bg-gray-50 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Flashcards</h1>
            <p className="text-gray-600 mt-1">Create and study your flashcard decks</p>
          </div>
          <Button
            href="/flashcards/create"
            variant="primary"
            iconLeft={<Plus size={16} />}
          >
            Create Deck
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search decks..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500">
                <option value="all">All Tags</option>
                <option value="vocabulary">Vocabulary</option>
                <option value="speaking">Speaking</option>
                <option value="writing">Writing</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={view === 'grid' ? 'primary' : 'outline'}
                onClick={() => setView('grid')}
                iconLeft={<Layout size={16} />}
              />
              <Button
                variant={view === 'list' ? 'primary' : 'outline'}
                onClick={() => setView('list')}
                iconLeft={<Settings size={16} />}
              />
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map((deck) => (
                <div
                  key={deck.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-soft hover:shadow-medium transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{deck.title}</h3>
                      <div className="p-2 bg-primary-50 rounded-lg">
                        <BookOpen className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{deck.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {deck.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{deck.cards.length} cards</span>
                      <span>Last updated {new Date(deck.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <Button
                      href={`/flashcards/${deck.id}`}
                      variant="primary"
                      fullWidth
                    >
                      Study Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {decks.map((deck) => (
                <div key={deck.id} className="py-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{deck.title}</h3>
                    <p className="text-gray-600">{deck.description}</p>
                    <div className="flex gap-2 mt-2">
                      {deck.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    href={`/flashcards/${deck.id}`}
                    variant="primary"
                  >
                    Study Now
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;