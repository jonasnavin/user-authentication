import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import { Bounce, ToastContainer } from 'react-toastify'
import { useAuthStore } from './store/authStore'
import HomePage from './pages/HomePage'
import Spinner from './components/Spinner'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

const RedirectAuthenticatedUser = ({ children }) => {

  const { isAuthenticated, user } = useAuthStore()

  if (isAuthenticated && user.isVerified) {
    return <Navigate to={'/'} replace />
  }

  return children
}

const ProtectedRoute = ({ children }) => {

  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />
  }

  if (!user.isVerified) {
    return <Navigate to={'/verify-email'} replace />
  }

  return children
}

const App = () => {

  const { checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <Spinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-sky-900 to-cyan-900 flex items-center justify-center">
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/verify-email' element={
          <RedirectAuthenticatedUser>
            <EmailVerificationPage />
          </RedirectAuthenticatedUser>} />
        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/reset-password/:token" element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path="*" element={<Navigate to={'/'} replace />} />
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  )
}

export default App