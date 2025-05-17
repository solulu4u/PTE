import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import LoginForm from "./components/auth/LoginForm"
import RegisterForm from "./components/auth/RegisterForm"
import SubscriptionPage from "./pages/SubscriptionPage"

// Speaking Components
import ReadAloudListPage from "./pages/practice/ReadAloudListPage"
import ReadAloud from "./components/practice/speaking/ReadAloud"
import RepeatSentence from "./components/practice/speaking/RepeatSentence"
import DescribeImage from "./components/practice/speaking/DescribeImage"
import RetellLecture from "./components/practice/speaking/RetellLecture"
import AnswerShortQuestion from "./components/practice/speaking/AnswerShortQuestion"

// Writing Components
import SummarizeWrittenText from "./components/practice/writing/SummarizeWrittenText"
import EssayWriting from "./components/practice/writing/EssayWriting"

// Reading Components
import FillInTheBlanks from "./components/practice/reading/FillInTheBlanks"
import MultipleChoiceQuestions from "./components/practice/reading/MultipleChoiceQuestions"
import ReorderParagraphs from "./components/practice/reading/ReorderParagraphs"
import ReadingWritingFillBlanks from "./components/practice/reading/ReadingWritingFillBlanks"

// Listening Components
import SummarizeSpokenText from "./components/practice/listening/SummarizeSpokenText"
import HighlightCorrectSummary from "./components/practice/listening/HighlightCorrectSummary"
import MultipleChoiceListening from "./components/practice/listening/MultipleChoiceQuestions"
import FillInTheBlanksListening from "./components/practice/listening/FillInTheBlanks"
import SelectMissingWord from "./components/practice/listening/SelectMissingWord"
import HighlightIncorrectWords from "./components/practice/listening/HighlightIncorrectWords"
import WriteFromDictation from "./components/practice/listening/WriteFromDictation"

import { AuthProvider } from "./hooks/useAuth"
import { sampleAudioUrl, practiceQuestions } from "./data/sampleData"

function App() {
    const handleComplete = (result: any) => {
        console.log("Exercise completed:", result)
    }

    const createRouteElement = (
        Component: React.ComponentType<any>,
        questionKey: keyof typeof practiceQuestions
    ) => {
        return (
            <div className="py-16">
                <Component
                    question={practiceQuestions[questionKey]}
                    onComplete={handleComplete}
                />
            </div>
        )
    }

    const speakingRoutes = [
        {
            path: "/practice/speaking/repeat-sentence",
            Component: RepeatSentence,
            questionKey: "repeatSentence",
        },
        {
            path: "/practice/speaking/describe-image",
            Component: DescribeImage,
            questionKey: "describeImage",
        },
        {
            path: "/practice/speaking/retell-lecture",
            Component: RetellLecture,
            questionKey: "retellLecture",
        },
        {
            path: "/practice/speaking/short-question",
            Component: AnswerShortQuestion,
            questionKey: "answerShortQuestion",
        },
    ]

    const writingRoutes = [
        {
            path: "/practice/writing/summarize",
            Component: SummarizeWrittenText,
            questionKey: "summarizeWrittenText",
        },
        {
            path: "/practice/writing/essay",
            Component: EssayWriting,
            questionKey: "essayWriting",
        },
    ]

    const readingRoutes = [
        {
            path: "/practice/reading/fill-blanks",
            Component: FillInTheBlanks,
            questionKey: "fillInTheBlanks",
        },
        {
            path: "/practice/reading/multiple-choice",
            Component: MultipleChoiceQuestions,
            questionKey: "multipleChoiceQuestions",
        },
        {
            path: "/practice/reading/reorder",
            Component: ReorderParagraphs,
            questionKey: "reorderParagraphs",
        },
        {
            path: "/practice/reading/rw-fill-blanks",
            Component: ReadingWritingFillBlanks,
            questionKey: "readingWritingFillBlanks",
        },
    ]

    const listeningRoutes = [
        {
            path: "/practice/listening/summarize",
            Component: SummarizeSpokenText,
            questionKey: "summarizeSpokenText",
        },
        {
            path: "/practice/listening/highlight-summary",
            Component: HighlightCorrectSummary,
            questionKey: "highlightCorrectSummary",
        },
        {
            path: "/practice/listening/multiple-choice",
            Component: MultipleChoiceListening,
            questionKey: "multipleChoiceListening",
        },
        {
            path: "/practice/listening/fill-blanks",
            Component: FillInTheBlanksListening,
            questionKey: "fillInTheBlanksListening",
        },
        {
            path: "/practice/listening/select-missing",
            Component: SelectMissingWord,
            questionKey: "selectMissingWord",
        },
        {
            path: "/practice/listening/highlight-incorrect",
            Component: HighlightIncorrectWords,
            questionKey: "highlightIncorrectWords",
        },
        {
            path: "/practice/listening/dictation",
            Component: WriteFromDictation,
            questionKey: "writeFromDictation",
        },
    ]

    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow pt-16">
                        <Routes>
                            {/* Main Routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/dashboard"
                                element={<DashboardPage />}
                            />
                            <Route
                                path="/subscription"
                                element={<SubscriptionPage />}
                            />
                            <Route
                                path="/login"
                                element={
                                    <div className="py-16">
                                        <LoginForm />
                                    </div>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <div className="py-16">
                                        <RegisterForm />
                                    </div>
                                }
                            />

                            {/* Read Aloud Routes */}
                            <Route
                                path="/practice/speaking/read-aloud"
                                element={<ReadAloudListPage />}
                            />
                            <Route
                                path="/practice/speaking/read-aloud/:id"
                                element={createRouteElement(
                                    ReadAloud,
                                    "readAloud"
                                )}
                            />

                            {/* Practice Routes */}
                            {[
                                ...speakingRoutes,
                                ...writingRoutes,
                                ...readingRoutes,
                                ...listeningRoutes,
                            ].map(({ path, Component, questionKey }) => (
                                <Route
                                    key={path}
                                    path={path}
                                    element={createRouteElement(
                                        Component,
                                        questionKey as keyof typeof practiceQuestions
                                    )}
                                />
                            ))}
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
