import { motion } from 'framer-motion'
import Input from '../components/Input'
import { User, Mail, Lock } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import axios from 'axios'
import DataContext from '../context/DataContext'
import { useAuthStore } from '../store/authStore'
import Button from '../components/Button'

const SignUpPage = () => {

    const {
        name, setName,
        email, setEmail,
        password, setPassword,
        viewPassword, setViewPassword
    } = useContext(DataContext)

    const { signup, error, isLoading } = useAuthStore()

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
                        id="fullName"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
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
                    <Button
                        value="Sign Up"
                        type='submit'
                        disabled={isLoading || !name || !email || !password}
                    />
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