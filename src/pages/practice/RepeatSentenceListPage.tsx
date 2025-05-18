import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Clock, CheckCircle } from "lucide-react"
import Button from "../../components/common/Button"
import { readAloudLessons, ReadAloudLesson } from "../../data/readAloud"
import { practiceQuestions } from "../../data/sampleData"

const difficultyColors = {
    beginner: "bg-success-100 text-success-700",
    intermediate: "bg-warning-100 text-warning-700",
    advanced: "bg-error-100 text-error-700",
}

const difficultyLabels = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
}

const RepeatSentenceListPage = () => {
    const navigate = useNavigate()
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
    const [showCompleted, setShowCompleted] = useState<boolean>(false)

    const filteredLessons = readAloudLessons.filter(lesson => {
        if (
            selectedDifficulty !== "all" &&
            lesson.difficulty !== selectedDifficulty
        ) {
            return false
        }
        if (showCompleted && !lesson.completed) {
            return false
        }
        return true
    })

    const handleLessonSelect = (lesson: ReadAloudLesson) => {
        navigate(`/practice/speaking/repeat-sentence/${lesson.id}`, {
            state: { lesson, sample: practiceQuestions.repeatSentence },
        })
    }

    return (
        <div className="bg-gray-50 pt-16 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/practice/speaking")}
                        className="mr-4"
                    >
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Read Aloud Practice
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Improve your pronunciation and fluency with these
                            carefully selected passages
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Difficulty Level
                            </label>
                            <select
                                value={selectedDifficulty}
                                onChange={e =>
                                    setSelectedDifficulty(e.target.value)
                                }
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                                <option value="all">All Levels</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">
                                    Intermediate
                                </option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showCompleted}
                                    onChange={e =>
                                        setShowCompleted(e.target.checked)
                                    }
                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    Show completed only
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLessons.map(lesson => (
                        <div
                            key={lesson.id}
                            className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-medium transition-shadow cursor-pointer"
                            onClick={() => handleLessonSelect(lesson)}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            difficultyColors[lesson.difficulty]
                                        }`}
                                    >
                                        {difficultyLabels[lesson.difficulty]}
                                    </span>
                                    {lesson.completed && (
                                        <CheckCircle className="w-5 h-5 text-success-500" />
                                    )}
                                </div>

                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-primary-50 rounded-lg">
                                        <lesson.icon className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {lesson.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {lesson.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center text-gray-500">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {lesson.estimatedTime} mins
                                    </div>
                                    {lesson.progress !== undefined && (
                                        <div className="flex items-center">
                                            <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                                                <div
                                                    className="h-2 bg-primary-500 rounded-full"
                                                    style={{
                                                        width: `${lesson.progress}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="text-gray-600">
                                                {lesson.progress}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                <Button
                                    variant={
                                        lesson.completed ? "outline" : "primary"
                                    }
                                    fullWidth
                                >
                                    {lesson.completed
                                        ? "Practice Again"
                                        : "Start Lesson"}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RepeatSentenceListPage
