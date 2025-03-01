import { motion } from 'framer-motion'
import Input from '../components/Input'
import { Mail, Lock } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'
import { useAuthStore } from '../store/authStore'
import Button from '../components/Button'

const LoginPage = () => {

    const {
        email, setEmail,
        password, setPassword,
        viewPassword, setViewPassword
    } = useContext(DataContext)

    const { login, error, isLoading } = useAuthStore()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        setViewPassword(false)
        setEmail("")
        setPassword("")
    }, [setEmail, setPassword, setViewPassword])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={
                `max-w-md w-full bg-gray-800 bg-opacity-50
                backdrop-filter backdrop-blur-xl rounded-2xl
                shadow-xl overflow-hidden`
            }
        >
            <div className='p-8'>
                <h2
                    className={
                        `text-3xl font-bold mb-6 text-center
                        bg-gradient-to-r from-sky-400 to-cyan-500
                        text-transparent bg-clip-text`
                    }
                >
                    Create Account
                </h2>
                <form onSubmit={e => handleLogin(e)}>
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type={viewPassword ? "text" : "password"}
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error ? (
                        <p className='text-md text-red-500 mb-3'>
                            {error}
                        </p>
                    ) : (null)
                    }
                    <div className="flex items-center mb-6">
                        <Link
                            to={'/forgot-password'}
                            className='text-sm text-sky-400 hover:underline'
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Button
                        value="Login"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading || !email || !password}
                    />
                </form>
            </div>

            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    Don't have an account?{" "}
                    <Link
                        to={'/signup'}
                        className='text-sky-400 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}

export default LoginPage