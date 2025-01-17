import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { LoaderCircle } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from 'react-toastify'

import DataContext from "../context/DataContext"
import { useAuthStore } from "../store/authStore"

const EmailVerificationPage = () => {

    const { code, setCode } = useContext(DataContext)
    const { verifyEmail, isLoading, error } = useAuthStore()

    const inputRefs = useRef([])
    const navigate = useNavigate()

    const handleChange = (index, value) => {
        const newCode = [...code]

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("")
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || ""
            }
            setCode(newCode)
            const lastIndex = newCode.findLastIndex(digit => digit !== "")
            const focusIndex = lastIndex < 5 ? lastIndex + 1 : 5
            inputRefs.current[focusIndex].focus()
        } else {
            newCode[index] = value
            setCode(newCode)
            if (value && index < 5) {
                inputRefs.current[index + 1].focus()
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const verificationCode = code.join("")
            const response = await verifyEmail(verificationCode)
            successAlert(response.data.message)
            navigate('/')
        } catch (error) {
            console.log(error.response.data.message)
            errorAlert(error.response.data.message)
        }
    }

    useEffect(() => {
        setCode(["", "", "", "", "", ""])
    }, [setCode])

    const errorAlert = (errorMessage) => {
        toast.error(errorMessage, {
            position: 'top-right',
        })
    }

    const successAlert = (successMessage) => {
        toast.success(successMessage, {
            position: 'top-center',
        })
    }

    return (
        <div className={
            `max-w-md w-full bg-gray-800 bg-opacity-50
             backdrop-filter backdrop-blur-xl
             rounded-2xl shadow-xl overflow-hidden`}
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={
                    `bg-gray-800 bg-opacity-50 backdrop-filter
                    backdrop-blur-xl rounded-2xl
                    shadow-2xl p-8 w-full max-w-md`
                }
            >
                <h2
                    className={
                        `text-3xl font-bold mb-6 text-center
                        bg-gradient-to-r from-sky-400 to-cyan-500
                        text-transparent bg-clip-text`
                    }
                >
                    Verify Your Email
                </h2>
                <p className="text-center text-gray-300 mb-6">
                    Enter the 6-digit code sent to your email address.
                </p>
                <form onSubmit={e => handleSubmit(e)} className="space-y-6">
                    <div className="flex justify-between">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                name={`verification input - ${index + 1}`}
                                maxLength={"6"}
                                value={digit}
                                onChange={e => handleChange(index, e.target.value)}
                                onKeyDown={e => handleKeyDown(index, e)}
                                className={
                                    `w-12 h-12 text-center text-2xl font-bold
                                    bg-gray-700 text-white border-2
                                    border-gray-400 rounded-lg
                                    focus:border-sky-500 focus:outline-none`
                                }
                            />
                        ))}
                    </div>
                    {error ? (
                        <p className='text-md text-red-500'>
                            {error}
                        </p>
                    ) : (null)
                    }
                    <motion.button
                        className={
                            `mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-500
                            to-cyan-600 text-white flex justify-center
                            font-bold rounded-lg shadow-lg hover:from-sky-600
                            hover:to-cyan-700 focus:outline-none focus:ring-2
                            focus:ring-sky-500 focus:ring-opacity-50 disabled:opacity-50`
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type='submit'
                        disabled={isLoading || code.some(digit => !digit)}
                    >
                        {isLoading ? <LoaderCircle className="animate-spin" /> : "Verify Email"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}

export default EmailVerificationPage