import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Trash2, X } from "lucide-react"
import Button from "../../components/common/Button"
import FlashcardCreate from "../../components/flashcard/FlashcardCreate"
import { emptyDeck } from "../../data/flashcards"
import type { Flashcard, FlashcardDeck } from "../../types/flashcard"

const CreateDeckPage = () => {
    const navigate = useNavigate()
    const [deck, setDeck] = useState<
        Omit<FlashcardDeck, "id" | "createdAt" | "updatedAt">
    >({
        ...emptyDeck,
    })
    const [showCardForm, setShowCardForm] = useState(false)
    const [tagInput, setTagInput] = useState("")

    const handleSaveDeck = () => {
        // Here we would normally save to backend
        // For now, just create a mock ID and redirect back to flashcards
        const newDeck: FlashcardDeck = {
            ...deck,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        // We would save the deck to backend here
        console.log("Saving deck:", newDeck)

        // Navigate back to flashcards page
        navigate("/flashcards")
    }

    const handleAddCard = (card: Omit<Flashcard, "id">) => {
        setDeck(prevDeck => ({
            ...prevDeck,
            cards: [
                ...prevDeck.cards,
                {
                    ...card,
                    id: Math.random().toString(36).substring(2, 9),
                },
            ],
        }))
        setShowCardForm(false)
    }

    const handleRemoveCard = (cardId: string) => {
        setDeck(prevDeck => ({
            ...prevDeck,
            cards: prevDeck.cards.filter(card => card.id !== cardId),
        }))
    }

    const handleAddTag = () => {
        if (tagInput.trim() && !deck.tags.includes(tagInput.trim())) {
            setDeck(prevDeck => ({
                ...prevDeck,
                tags: [...prevDeck.tags, tagInput.trim()],
            }))
            setTagInput("")
        }
    }

    const handleRemoveTag = (tag: string) => {
        setDeck(prevDeck => ({
            ...prevDeck,
            tags: prevDeck.tags.filter(t => t !== tag),
        }))
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddTag()
        }
    }

    return (
        <div className="bg-gray-50 pt-16 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/flashcards")}
                        className="mr-4"
                        iconLeft={<ArrowLeft size={16} />}
                    >
                        Back to Decks
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Create New Deck
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Add a new flashcard deck to your collection
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Deck Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={deck.title}
                                onChange={e =>
                                    setDeck({ ...deck, title: e.target.value })
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Enter a title for your deck..."
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={deck.description}
                                onChange={e =>
                                    setDeck({
                                        ...deck,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full h-24 p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Describe what this deck is about..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tags
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={e => setTagInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Add tags (e.g., vocabulary, pte, etc.)"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleAddTag}
                                    className="ml-2"
                                    iconLeft={<Plus size={16} />}
                                >
                                    Add
                                </Button>
                            </div>
                            {deck.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {deck.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                className="ml-1 text-gray-500 hover:text-gray-700"
                                                onClick={() =>
                                                    handleRemoveTag(tag)
                                                }
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Cards ({deck.cards.length})
                                </h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowCardForm(true)}
                                    iconLeft={<Plus size={16} />}
                                >
                                    Add Card
                                </Button>
                            </div>

                            {showCardForm ? (
                                <div className="mb-6">
                                    <h4 className="text-md font-medium text-gray-800 mb-2">
                                        Create New Card
                                    </h4>
                                    <FlashcardCreate
                                        onSave={handleAddCard}
                                        onCancel={() => setShowCardForm(false)}
                                    />
                                </div>
                            ) : deck.cards.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                    <p className="text-gray-500">
                                        No cards added yet. Click "Add Card" to
                                        begin.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {deck.cards.map(card => (
                                        <div
                                            key={card.id}
                                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                        >
                                            <div className="flex justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">
                                                        {card.front}
                                                    </h4>
                                                    <p className="text-gray-600 mt-1">
                                                        {card.back}
                                                    </p>
                                                    <div className="mt-2">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {card.difficulty}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        handleRemoveCard(
                                                            card.id
                                                        )
                                                    }
                                                    className="text-gray-500 hover:text-red-500"
                                                    iconLeft={
                                                        <Trash2 size={16} />
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/flashcards")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                variant="primary"
                                onClick={handleSaveDeck}
                                disabled={
                                    !deck.title || deck.cards.length === 0
                                }
                            >
                                Create Deck
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateDeckPage
