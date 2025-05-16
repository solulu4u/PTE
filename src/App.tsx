import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import LoginForm from "./components/auth/LoginForm"
import RegisterForm from "./components/auth/RegisterForm"
import SubscriptionPage from "./pages/SubscriptionPage"
import FlashcardsPage from "./pages/flashcards/FlashcardsPage"
import FlashcardStudyPage from "./pages/flashcards/FlashcardStudyPage"
import CreateDeckPage from "./pages/flashcards/CreateDeckPage"

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

                            {/* Flashcard Routes */}
                            <Route
                                path="/flashcards"
                                element={<FlashcardsPage />}
                            />
                            <Route
                                path="/flashcards/create"
                                element={<CreateDeckPage />}
                            />
                            <Route
                                path="/flashcards/study/:deckId"
                                element={<FlashcardStudyPage />}
                            />

                            {/* Practice Routes */}
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
                            <Route
                                path="/practice/speaking/repeat-sentence"
                                element={createRouteElement(
                                    RepeatSentence,
                                    "repeatSentence"
                                )}
                            />
                            <Route
                                path="/practice/speaking/describe-image"
                                element={createRouteElement(
                                    DescribeImage,
                                    "describeImage"
                                )}
                            />
                            <Route
                                path="/practice/speaking/retell-lecture"
                                element={createRouteElement(
                                    RetellLecture,
                                    "retellLecture"
                                )}
                            />
                            <Route
                                path="/practice/speaking/short-question"
                                element={createRouteElement(
                                    AnswerShortQuestion,
                                    "answerShortQuestion"
                                )}
                            />
                            <Route
                                path="/practice/writing/summarize"
                                element={createRouteElement(
                                    SummarizeWrittenText,
                                    "summarizeWrittenText"
                                )}
                            />
                            <Route
                                path="/practice/writing/essay"
                                element={createRouteElement(
                                    EssayWriting,
                                    "essayWriting"
                                )}
                            />
                            <Route
                                path="/practice/reading/fill-blanks"
                                element={createRouteElement(
                                    FillInTheBlanks,
                                    "fillInTheBlanks"
                                )}
                            />
                            <Route
                                path="/practice/reading/multiple-choice"
                                element={createRouteElement(
                                    MultipleChoiceQuestions,
                                    "multipleChoiceQuestions"
                                )}
                            />
                            <Route
                                path="/practice/reading/reorder"
                                element={createRouteElement(
                                    ReorderParagraphs,
                                    "reorderParagraphs"
                                )}
                            />
                            <Route
                                path="/practice/reading/rw-fill-blanks"
                                element={createRouteElement(
                                    ReadingWritingFillBlanks,
                                    "readingWritingFillBlanks"
                                )}
                            />
                            <Route
                                path="/practice/listening/summarize"
                                element={createRouteElement(
                                    SummarizeSpokenText,
                                    "summarizeSpokenText"
                                )}
                            />
                            <Route
                                path="/practice/listening/highlight-summary"
                                element={createRouteElement(
                                    HighlightCorrectSummary,
                                    "highlightCorrectSummary"
                                )}
                            />
                            <Route
                                path="/practice/listening/multiple-choice"
                                element={createRouteElement(
                                    MultipleChoiceListening,
                                    "multipleChoiceListening"
                                )}
                            />
                            <Route
                                path="/practice/listening/fill-blanks"
                                element={createRouteElement(
                                    FillInTheBlanksListening,
                                    "fillInTheBlanksListening"
                                )}
                            />
                            <Route
                                path="/practice/listening/select-missing"
                                element={createRouteElement(
                                    SelectMissingWord,
                                    "selectMissingWord"
                                )}
                            />
                            <Route
                                path="/practice/listening/highlight-incorrect"
                                element={createRouteElement(
                                    HighlightIncorrectWords,
                                    "highlightIncorrectWords"
                                )}
                            />
                            <Route
                                path="/practice/listening/dictation"
                                element={createRouteElement(
                                    WriteFromDictation,
                                    "writeFromDictation"
                                )}
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
