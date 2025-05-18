import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react"
import {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    isAuthenticated,
} from "../lib/api"

interface User {
    id: number
    username: string
    email: string
    full_name?: string
    avatar_url?: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    register: (
        username: string,
        email: string,
        password: string
    ) => Promise<void>
    logout: () => Promise<void>
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                if (isAuthenticated()) {
                    const userData = await getCurrentUser()
                    setUser(userData)
                }
            } catch (error) {
                console.error("Error initializing auth:", error)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        initAuth()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const userData = await loginUser(email, password)
            setUser(userData)
        } catch (error) {
            console.error("Login error:", error)
            throw error
        }
    }

    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        try {
            const response = await registerUser({ username, email, password })
            // Sau khi đăng ký thành công, tự động đăng nhập
            await login(email, password)
        } catch (error) {
            console.error("Registration error:", error)
            throw error
        }
    }

    const logout = async () => {
        try {
            logoutUser()
            setUser(null)
        } catch (error) {
            console.error("Logout error:", error)
            throw error
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, login, register, logout, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
