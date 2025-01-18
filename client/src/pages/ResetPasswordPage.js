import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import DataContext from '../context/DataContext'
import { motion } from "framer-motion"
import Input from '../components/Input'
import { Lock } from 'lucide-react'
import Button from '../components/Button'
import { toast } from 'react-toastify'

const ResetPasswordPage = () => {

    const { password, setPassword, viewPassword, setViewPassword, viewConfirmPassword, setViewConfirmPassword } = useContext(DataContext)
    const [confirmPassword, setConfirmPassword] = useState("")
    const { isLoading, resetPassword, error } = useAuthStore()

    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            toast.error("Passwords do not match each other")
            return
        }
        try {
            await resetPassword(token, password)
            toast.success("Password reseted successfully")
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    useEffect(() => {
        setViewPassword(false)
        setViewConfirmPassword(false)
    }, [setViewPassword, setViewConfirmPassword])

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
            <div className="p-8">
                <h2 className={
                    `text-3xl font-bold mb-6 text-center
                    bg-gradient-to-r from-sky-400 to-cyan-500
                    text-transparent bg-clip-text`}
                >
                    Reset Password
                </h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        icon={Lock}
                        type={viewPassword ? "text" : "password"}
                        placeholder="New Password"
                        id="new-password"
                        minLength="8"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        icon={Lock}
                        type={viewConfirmPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        id="confirm-new-password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                    <Button
                        value="Set New Password"
                        type='submit'
                        disabled={isLoading || !password || !confirmPassword}
                    />
                </form>
            </div>

        </motion.div>
    )
}

export default ResetPasswordPage