import { LucideIcon, BookOpen, Sparkles, Brain, Award, Star } from "lucide-react"

export interface ReadAloudLesson {
    id: number
    title: string
    description: string
    difficulty: "beginner" | "intermediate" | "advanced"
    estimatedTime: number // in minutes
    icon: LucideIcon
    progress?: number
    completed?: boolean
    score?: number
    content: string
}

export const readAloudLessons: ReadAloudLesson[] = [
    {
        id: 1,
        title: "Basic Pronunciation",
        description: "Simple sentences",
        difficulty: "beginner",
        estimatedTime: 5,
        icon: BookOpen,
        progress: 100,
        completed: true,
        score: 85,
        content: "The uniqueness of the Australian platypus makes it one of the most unusual creatures in the animal kingdom."
    },
    {
        id: 2,
        title: "Common Words",
        description: "Everyday vocabulary",
        difficulty: "beginner",
        estimatedTime: 7,
        icon: Sparkles,
        progress: 60,
        content: "Regular exercise and a balanced diet are essential components of a healthy lifestyle."
    },
    {
        id: 3,
        title: "Academic Terms",
        description: "Scientific concepts",
        difficulty: "intermediate",
        estimatedTime: 10,
        icon: Brain,
        content: "The photosynthesis process converts light energy into chemical energy, which plants use to produce glucose from carbon dioxide and water."
    },
    {
        id: 4,
        title: "Complex Sentences",
        description: "Advanced structures",
        difficulty: "intermediate",
        estimatedTime: 12,
        icon: Award,
        content: "While there are numerous theories about the origins of language, researchers continue to debate the exact mechanisms that led to the development of human speech."
    },
    {
        id: 5,
        title: "Technical Passages",
        description: "Specialized topics",
        difficulty: "advanced",
        estimatedTime: 15,
        icon: Star,
        content: "The quantum entanglement phenomenon, which Einstein famously called 'spooky action at a distance,' demonstrates the peculiar interconnectedness of particles at the quantum level."
    }
]