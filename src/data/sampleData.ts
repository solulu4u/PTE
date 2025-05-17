export const sampleAudioUrl =
    "https://assets.ctfassets.net/9hqt62y5kz7p/5GU8AFv1yiLrOwvGiRKzDc/5b41e8fe12dd0c16cfb84d0bcf6a91fc/Question_1.mp3"

export const practiceQuestions = {
    // Speaking section
    readAloud: {
        id: 1,
        content:
            "The uniqueness of the Australian platypus makes it one of the most unusual creatures in the animal kingdom.",
        time_limit: 40,
    },

    repeatSentence: {
        id: 2,
        audio_url: sampleAudioUrl,
        time_limit: 40,
    },

    describeImage: {
        id: 3,
        image_url:
            "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg",
        title: "Global Temperature Trends",
        description: "A line graph showing global temperature changes",
        time_limit: 40,
    },

    retellLecture: {
        id: 4,
        audio_url: sampleAudioUrl,
        title: "Climate Change Impact",
        time_limit: 40,
    },

    answerShortQuestion: {
        id: 5,
        audio_url: sampleAudioUrl,
        time_limit: 40,
    },

    // Writing section
    summarizeWrittenText: {
        id: 6,
        content:
            "Climate change is one of the most pressing challenges facing our planet today.",
        time_limit: 600,
    },

    essayWriting: {
        id: 7,
        title: "Technology and Education",
        prompt: "Discuss the impact of technology on modern education.",
        time_limit: 1200,
        min_words: 200,
        max_words: 300,
    },

    // Reading section
    fillInTheBlanks: {
        id: 8,
        content:
            "Climate change is one of the most [[1]] challenges facing our planet.",
        time_limit: 300,
        blanks: [{ id: "b1", correctWordId: "w1" }],
        wordOptions: [{ id: "w1", text: "pressing" }],
    },

    multipleChoiceQuestions: {
        id: 9,
        passage:
            "The Industrial Revolution marked a major turning point in human history.",
        questions: [
            {
                id: "q1",
                text: "What was the Industrial Revolution?",
                options: [
                    { id: "a1", text: "A major turning point" },
                    { id: "a2", text: "A minor event" },
                    { id: "a3", text: "A recent development" },
                ],
                correctOptionId: "a1",
            },
        ],
        time_limit: 300,
    },

    reorderParagraphs: {
        id: 10,
        paragraphs: [
            { id: "p1", text: "First paragraph", originalIndex: 0 },
            { id: "p2", text: "Second paragraph", originalIndex: 1 },
            { id: "p3", text: "Third paragraph", originalIndex: 2 },
        ],
        time_limit: 300,
    },

    readingWritingFillBlanks: {
        id: 11,
        passage: "The study of [[1]] is crucial for understanding life.",
        blanks: [{ id: "b1", correctOptionId: "o1" }],
        options: [
            { id: "o1", text: "biology" },
            { id: "o2", text: "geology" },
            { id: "o3", text: "chemistry" },
        ],
        time_limit: 300,
    },

    // Listening section
    summarizeSpokenText: {
        id: 12,
        audio_url: sampleAudioUrl,
        time_limit: 600,
    },

    highlightCorrectSummary: {
        id: 13,
        audio_url: sampleAudioUrl,
        summaries: [
            {
                id: "s1",
                text: "Correct summary of the lecture",
                isCorrect: true,
            },
            { id: "s2", text: "Incorrect summary option 1", isCorrect: false },
            { id: "s3", text: "Incorrect summary option 2", isCorrect: false },
        ],
        time_limit: 300,
    },

    multipleChoiceListening: {
        id: 14,
        audio_url: sampleAudioUrl,
        questions: [
            {
                id: "q1",
                text: "What is the main topic discussed?",
                options: [
                    { id: "a1", text: "Climate Change" },
                    { id: "a2", text: "Economic Growth" },
                    { id: "a3", text: "Social Development" },
                ],
                correctOptionId: "a1",
            },
        ],
        time_limit: 300,
    },

    fillInTheBlanksListening: {
        id: 15,
        audio_url: sampleAudioUrl,
        text: "Climate [[1]] is important for [[2]] development.",
        blanks: [
            { id: "b1", answer: "change" },
            { id: "b2", answer: "sustainable" },
        ],
        time_limit: 300,
    },

    selectMissingWord: {
        id: 16,
        audio_url: sampleAudioUrl,
        options: [
            { id: "o1", text: "environment" },
            { id: "o2", text: "economy" },
            { id: "o3", text: "society" },
        ],
        correctOptionId: "o1",
        time_limit: 300,
    },

    highlightIncorrectWords: {
        id: 17,
        audio_url: sampleAudioUrl,
        words: [
            { id: "w1", text: "climate", isIncorrect: false },
            { id: "w2", text: "weather", isIncorrect: true },
            { id: "w3", text: "global", isIncorrect: false },
        ],
        time_limit: 300,
    },

    writeFromDictation: {
        id: 18,
        audio_url: sampleAudioUrl,
        correct_text:
            "Climate change is a global challenge that requires immediate action.",
        time_limit: 300,
    },
}
