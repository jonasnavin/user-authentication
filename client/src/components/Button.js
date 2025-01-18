import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { LoaderCircle } from 'lucide-react'

const Button = ({ value, ...props }) => {

    const {isLoading} = useAuthStore()

    return (
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
            {...props}
        >
            {isLoading ? <LoaderCircle className="animate-spin" /> : value}
        </motion.button>
    )
}

export default Button