// src/lib/api.ts
import axios from "axios"

// Đặt URL của backend
const API_URL = "http://localhost:8000"

// Lưu token vào localStorage
const setToken = (token: string) => {
    localStorage.setItem("token", token)
}

// Lấy token từ localStorage
const getToken = () => {
    return localStorage.getItem("token")
}

// Xóa token khỏi localStorage
const removeToken = () => {
    localStorage.removeItem("token")
}

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

// Hàm đăng ký user mới
export const registerUser = async (userData: {
    username: string
    email: string
    password: string
    full_name?: string
}) => {
    const response = await axios.post(`${API_URL}/register`, userData)
    return response.data
}

// Hàm đăng nhập
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/token`,
            new URLSearchParams({ username: email, password })
        )
        const { access_token } = response.data
        setToken(access_token)

        // Lấy thông tin user ngay sau khi đăng nhập
        const userResponse = await getCurrentUser(access_token)
        return userResponse
    } catch (error) {
        removeToken()
        throw error
    }
}

// Hàm lấy thông tin user hiện tại
export const getCurrentUser = async (token?: string) => {
    const authToken = token || getToken()
    if (!authToken) {
        throw new Error("No token found")
    }

    const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    })
    return response.data
}

// Hàm đăng xuất
export const logoutUser = () => {
    removeToken()
}

// Kiểm tra xem user đã đăng nhập chưa
export const isAuthenticated = () => {
    return !!getToken()
}
