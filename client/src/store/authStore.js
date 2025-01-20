import { create } from "zustand"
import axios from "axios"

const API_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000/api/auth" : "https://user-authentication-backend-ibby.onrender.com"

axios.defaults.withCredentials = true

export const useAuthStore = create(set => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (name, email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/signup`, { name, email, password })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false })
            throw error
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false })
            throw error
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null })
        try {
            await axios.post(`${API_URL}/logout`)
            set({ user: null, isAuthenticated: false, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false })
            throw error
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
            return response
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false })
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })
        try {
            const response = await axios.get(`${API_URL}/check-auth`)
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            set({ isAuthenticated: false, isCheckingAuth: false })
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null, })
        try {
            await axios.post(`${API_URL}/forgot-password`, { email })
            set({ isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message, isLoading: false })
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null, })
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password })
            set({ user: response.data.user, isLoading: false, isAuthenticated: true, })
        } catch (error) {
            console.log(error)
            set({ error: error.response.data.message, isLoading: false })
        }
    }
}))