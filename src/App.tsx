import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

// Speaking Components
import ReadAloud from './components/practice/speaking/ReadAloud';
import RepeatSentence from './components/practice/speaking/RepeatSentence';
import DescribeImage from './components/practice/speaking/DescribeImage';
import RetellLecture from './components/practice/speaking/RetellLecture';
import AnswerShortQuestion from './components/practice/speaking/AnswerShortQuestion';

// Writing Components
import SummarizeWrittenText from './components/practice/writing/SummarizeWrittenText';
import EssayWriting from './components/practice/writing/EssayWriting';

// Reading Components
import FillInTheBlanks from './components/practice/reading/FillInTheBlanks';
import MultipleChoiceQuestions from './components/practice/reading/MultipleChoiceQuestions';
import ReorderParagraphs from './components/practice/reading/ReorderParagraphs';
import ReadingWritingFillBlanks from './components/practice/reading/ReadingWritingFillBlanks';

// Listening Components
import SummarizeSpokenText from './components/practice/listening/SummarizeSpokenText';
import HighlightCorrectSummary from './components/practice/listening/HighlightCorrectSummary';
import MultipleChoiceListening from './components/practice/listening/MultipleChoiceQuestions';
import FillInTheBlanksListening from './components/practice/listening/FillInTheBlanks';
import SelectMissingWord from './components/practice/listening/SelectMissingWord';
import HighlightIncorrectWords from './components/practice/listening/HighlightIncorrectWords';
import WriteFromDictation from './components/practice/listening/WriteFromDictation';

import { AuthProvider } from './hooks/useAuth';

function App() {
  // Sample audio URL for listening exercises
  const sampleAudioUrl = "https://assets.ctfassets.net/9hqt62y5kz7p/5GU8AFv1yiLrOwvGiRKzDc/5b41e8fe12dd0c16cfb84d0bcf6a91fc/Question_1.mp3";

  const handleComplete = (result: any) => {
    console.log('Exercise completed:', result);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<div className="py-16"><LoginForm /></div>} />
              <Route path="/register" element={<div className="py-16"><RegisterForm /></div>} />
              
              {/* Speaking Routes */}
              <Route 
                path="/practice/speaking/read-aloud" 
                element={
                  <div className="py-16">
                    <ReadAloud 
                      question={{
                        id: 1,
                        content: "The uniqueness of the Australian platypus makes it one of the most unusual creatures in the animal kingdom.",
                        time_limit: 40
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/speaking/repeat-sentence" 
                element={
                  <div className="py-16">
                    <RepeatSentence 
                      question={{
                        id: 2,
                        audio_url: sampleAudioUrl,
                        time_limit: 40
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/speaking/describe-image" 
                element={
                  <div className="py-16">
                    <DescribeImage 
                      question={{
                        id: 3,
                        image_url: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg",
                        title: "Global Temperature Trends",
                        description: "A line graph showing global temperature changes",
                        time_limit: 40
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/speaking/retell-lecture" 
                element={
                  <div className="py-16">
                    <RetellLecture 
                      question={{
                        id: 4,
                        audio_url: sampleAudioUrl,
                        title: "Climate Change Impact",
                        time_limit: 40
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/speaking/short-question" 
                element={
                  <div className="py-16">
                    <AnswerShortQuestion 
                      question={{
                        id: 5,
                        audio_url: sampleAudioUrl,
                        time_limit: 40
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />

              {/* Writing Routes */}
              <Route 
                path="/practice/writing/summarize" 
                element={
                  <div className="py-16">
                    <SummarizeWrittenText 
                      question={{
                        id: 6,
                        content: "Climate change is one of the most pressing challenges facing our planet today.",
                        time_limit: 600
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/writing/essay" 
                element={
                  <div className="py-16">
                    <EssayWriting 
                      question={{
                        id: 7,
                        title: "Technology and Education",
                        prompt: "Discuss the impact of technology on modern education.",
                        time_limit: 1200,
                        min_words: 200,
                        max_words: 300
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />

              {/* Reading Routes */}
              <Route 
                path="/practice/reading/fill-blanks" 
                element={
                  <div className="py-16">
                    <FillInTheBlanks 
                      question={{
                        id: 8,
                        content: "Climate change is one of the most [[1]] challenges facing our planet.",
                        time_limit: 300,
                        blanks: [{ id: 'b1', correctWordId: 'w1' }],
                        wordOptions: [{ id: 'w1', text: 'pressing' }]
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/reading/multiple-choice" 
                element={
                  <div className="py-16">
                    <MultipleChoiceQuestions 
                      question={{
                        id: 9,
                        passage: "The Industrial Revolution marked a major turning point in human history.",
                        questions: [{
                          id: "q1",
                          text: "What was the Industrial Revolution?",
                          options: [
                            { id: "a1", text: "A major turning point" }
                          ],
                          correctOptionId: "a1"
                        }],
                        time_limit: 300
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/reading/reorder" 
                element={
                  <div className="py-16">
                    <ReorderParagraphs 
                      question={{
                        id: 10,
                        paragraphs: [
                          { id: "p1", text: "First paragraph", originalIndex: 0 }
                        ],
                        time_limit: 300
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/reading/rw-fill-blanks" 
                element={
                  <div className="py-16">
                    <ReadingWritingFillBlanks 
                      question={{
                        id: 11,
                        passage: "The study of [[1]] is crucial for understanding life.",
                        blanks: [{ id: "b1", correctOptionId: "o1" }],
                        options: [{ id: "o1", text: "biology" }],
                        time_limit: 300
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />

              {/* Listening Routes */}
              <Route 
                path="/practice/listening/summarize" 
                element={
                  <div className="py-16">
                    <SummarizeSpokenText 
                      question={{
                        id: 12,
                        audio_url: sampleAudioUrl,
                        time_limit: 600
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/listening/highlight-summary" 
                element={
                  <div className="py-16">
                    <HighlightCorrectSummary 
                      question={{
                        id: 13,
                        audio_url: sampleAudioUrl,
                        summaries: [
                          { id: 's1', text: 'Correct summary', isCorrect: true },
                          { id: 's2', text: 'Incorrect summary', isCorrect: false }
                        ],
                        time_limit: 300
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/listening/multiple-choice" 
                element={
                  <div className="py-16">
                    <MultipleChoiceListening 
                      question={{
                        id: 14,
                        audio_url: sampleAudioUrl,
                        questions: [{
                          id: "q1",
                          text: "What is the main topic?",
                          options: [{ id: "a1", text: "Climate Change" }],
                          correctOptionId: "a1"
                        }],
                        time_limit: 300
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/listening/fill-blanks" 
                element={
                  <div className="py-16">
                    <FillInTheBlanksListening 
                      question={{
                        id: 15,
                        audio_url: sampleAudioUrl,
                        text: "Climate [[1]] is important.",
                        blanks: [{ id: "b1", answer: "change" }],
                        time_limit: 300
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/listening/select-missing" 
                element={
                  <div className="py-16">
                    <SelectMissingWord 
                      question={{
                        id: 16,
                        audio_url: sampleAudioUrl,
                        options: [
                          { id: "o1", text: "environment" }
                        ],
                        correctOptionId: "o1",
                        time_limit: 300
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/listening/highlight-incorrect" 
                element={
                  <div className="py-16">
                    <HighlightIncorrectWords 
                      question={{
                        id: 17,
                        audio_url: sampleAudioUrl,
                        words: [
                          { id: "w1", text: "climate", isIncorrect: false },
                          { id: "w2", text: "weather", isIncorrect: true }
                        ],
                        time_limit: 300
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
              <Route 
                path="/practice/listening/dictation" 
                element={
                  <div className="py-16">
                    <WriteFromDictation 
                      question={{
                        id: 18,
                        audio_url: sampleAudioUrl,
                        correct_text: "Climate change is a global challenge.",
                        time_limit: 300
                      }}
                      onComplete={handleComplete} 
                    />
                  </div>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;