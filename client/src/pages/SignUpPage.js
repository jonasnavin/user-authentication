import { motion } from 'framer-motion'
import Input from '../components/Input'
import { User, Mail, Lock, LoaderCircle } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import axios from 'axios'
import DataContext from '../context/DataContext'
import { useAuthStore } from '../store/authStore'

const SignUpPage = () => {

    const {
        name, setName,
        email, setEmail,
        password, setPassword,
        viewPassword, setViewPassword
    } = useContext(DataContext)

    const {signup, error, isLoading} = useAuthStore()

    const navigate = useNavigate()

    axios.defaults.withCredentials = true

    const handleSingup = async (e) => {
        e.preventDefault()
        try {
            await signup(name, email, password)
            navigate('/verify-email')
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        setViewPassword(false)
        setName("")
        setEmail("")
        setPassword("")
    }, [setName, setEmail, setPassword, setViewPassword])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={
                `max-w-md w-full bg-gray-800 bg-opacity-50
                backdrop-filter backdrop-blur-xl
                rounded-2xl shadow-xl overflow-hidden`
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
                <form onSubmit={e => handleSingup(e)}>
                    <Input
                        icon={User}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type={viewPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        minLength="8"
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error ? (
                        <p className='text-md text-red-500'>
                            {error}
                        </p>
                    ) : (null)
                    }
                    <PasswordStrengthMeter password={password} />
                    <motion.button
                        className={
                            `mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-500
                            to-cyan-600 text-white flex justify-center
                            font-bold rounded-lg shadow-lg hover:from-sky-600
                            hover:to-cyan-700 focus:outline-none focus:ring-2
                            focus:ring-sky-500 focus:ring-opacity-50 disabled:opacity-50`
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading || !name || !email || !password}
                    >
                        {isLoading ? <LoaderCircle className="animate-spin" /> : "Sign Up"}
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    Already have an account?{" "}
                    <Link
                        to={'/login'}
                        className='text-sky-400 hover:underline'
                    >
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}

export default SignUpPage