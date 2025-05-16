// Mock API functions for reading exercises
export const readingApi = {
    getFillBlanksExercises: async () => {
        // Simulated API call
        return Promise.resolve([
            {
                id: 1,
                title: "Basic Fill in the Blanks",
                difficulty: "easy",
                completed: true,
                score: 85,
            },
            {
                id: 2,
                title: "Intermediate Vocabulary",
                difficulty: "medium",
                completed: false,
                score: null,
            },
            {
                id: 3,
                title: "Advanced Academic Text",
                difficulty: "hard",
                completed: false,
                score: null,
            },
        ])
    },
}
