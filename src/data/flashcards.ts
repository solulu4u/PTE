import type { FlashcardDeck } from "../types/flashcard"

export const sampleDecks: FlashcardDeck[] = [
    {
        id: "1",
        title: "PTE Vocabulary",
        description: "Essential vocabulary for PTE Academic test",
        cards: [
            {
                id: "1",
                front: "Ubiquitous",
                back: "Present, appearing, or found everywhere",
                difficulty: "medium",
                timesReviewed: 0,
                correctReviews: 0,
            },
            {
                id: "2",
                front: "Ephemeral",
                back: "Lasting for a very short time",
                difficulty: "hard",
                timesReviewed: 0,
                correctReviews: 0,
            },
            {
                id: "3",
                front: "Pragmatic",
                back: "Dealing with things sensibly and realistically",
                difficulty: "medium",
                timesReviewed: 0,
                correctReviews: 0,
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublic: true,
        authorId: "1",
        tags: ["vocabulary", "pte", "english"],
    },
    {
        id: "2",
        title: "Common Phrases",
        description: "Useful phrases for speaking tasks",
        cards: [
            {
                id: "1",
                front: "In a nutshell",
                back: "To sum up, in essence, to put it briefly",
                difficulty: "easy",
                timesReviewed: 0,
                correctReviews: 0,
            },
            {
                id: "2",
                front: "On the other hand",
                back: "Used to present contrasting point of view",
                difficulty: "easy",
                timesReviewed: 0,
                correctReviews: 0,
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublic: true,
        authorId: "1",
        tags: ["speaking", "phrases", "english"],
    },
]

export const emptyDeck: Omit<FlashcardDeck, "id" | "createdAt" | "updatedAt"> =
    {
        title: "",
        description: "",
        cards: [],
        isPublic: true,
        authorId: "1",
        tags: [],
    }
