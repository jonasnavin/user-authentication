import { motion } from "framer-motion"
import { useAuthStore } from "../store/authStore"
import { useContext, useState } from "react"
import DataContext from "../context/DataContext"
import Input from "../components/Input"
import { ArrowLeft, LoaderCircle, Mail } from "lucide-react"
import { Link } from "react-router-dom"

const ForgotPasswordPage = () => {

    const { email, setEmail } = useContext(DataContext)
    const { isLoading, forgotPassword } = useAuthStore()
    const [isSubmitted, setIsSubmitted] = useState(true)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await forgotPassword(email)
            setIsSubmitted(false)
        } catch (error) {
            console.log(error)
        }
    }

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
                    bg-gradient-to-br from-cyan-200 via-cyan-400
                    to-cyan-600 text-transparent bg-clip-text`
                }>
                    Forgot Password
                </h2>

                {isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <p className="text-gray-300 mb-6 text-center">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        className={
                            `mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-500
                            to-cyan-600 text-white flex justify-center
                            font-bold rounded-lg shadow-lg hover:from-sky-600
                            hover:to-cyan-700 focus:outline-none focus:ring-2
                            focus:ring-sky-500 focus:ring-opacity-50 disabled:opacity-50`
                        }
                    >
                        {isLoading ? <LoaderCircle className="animate-spin" /> : "Send Reset Link"}
                    </motion.button>
                    </form>
                ) : (
                    <div className="text-center">
                        <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{type: "spring", stiffness: 500, damping: 30}}
                        className={
                            `w-16 h-16 bg-sky-500 rounded-full flex
                            items-center justify-center mx-auto mb-4`
                        }
                        >
                            <Mail className="h-8 w-8 text-white" />
                        </motion.div>
                        <p className="text-gray-300 mb-6">
                            If an account exists for {email}, you will receive a password reset link shortly.
                        </p>
                    </div>
                )}
            </div>

            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <Link to={"/login"} className="text-sm text-sky-400 hover:underline flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                </Link>
            </div>

        </motion.div>
    )
}

export default ForgotPasswordPage