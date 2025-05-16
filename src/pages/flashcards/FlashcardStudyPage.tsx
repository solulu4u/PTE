import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, BookOpen, Layout, Pencil, Grid } from "lucide-react"
import Button from "../../components/common/Button"
import FlashcardDeck from "../../components/flashcard/FlashcardDeck"
import type {
    FlashcardDeck as FlashcardDeckType,
    StudyMode,
} from "../../types/flashcard"
import { sampleDecks } from "../../data/flashcards"

const FlashcardStudyPage = () => {
    const { deckId } = useParams<{ deckId: string }>()
    const navigate = useNavigate()
    const [deck, setDeck] = useState<FlashcardDeckType | null>(null)
    const [mode, setMode] = useState<StudyMode>("flip")

    useEffect(() => {
        // Find the deck by ID from sample data
        const foundDeck = sampleDecks.find(d => d.id === deckId)
        if (foundDeck) {
            setDeck(foundDeck)
        } else {
            // If deck not found, redirect to flashcards page
            navigate("/flashcards")
        }
    }, [deckId, navigate])

    const studyModes = [
        { id: "flip", label: "Flip Cards", icon: BookOpen },
        { id: "quiz", label: "Quiz", icon: Layout },
        { id: "write", label: "Write", icon: Pencil },
        { id: "match", label: "Match", icon: Grid },
    ]

    if (!deck) {
        return (
            <div className="bg-gray-50 pt-16 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p>Loading deck...</p>
                    </div>
                </div>
            </div>
        )
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
                            {deck.title}
                        </h1>
                        <p className="text-gray-600 mt-1">{deck.description}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {studyModes.map(studyMode => (
                            <button
                                key={studyMode.id}
                                onClick={() =>
                                    setMode(studyMode.id as StudyMode)
                                }
                                className={`p-4 rounded-lg border-2 transition-colors ${
                                    mode === studyMode.id
                                        ? "border-primary-500 bg-primary-50 text-primary-700"
                                        : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"
                                }`}
                            >
                                <studyMode.icon className="w-6 h-6 mx-auto mb-2" />
                                <span className="block text-sm font-medium">
                                    {studyMode.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {mode === "flip" && <FlashcardDeck cards={deck.cards} />}
                    {/* Other study modes will be implemented here */}
                </div>
            </div>
        </div>
    )
}

export default FlashcardStudyPage
