import { motion } from "framer-motion"
import { useAuthStore } from "../store/authStore"
import { format } from "date-fns"



const HomePage = () => {

  const { user, logout } = useAuthStore()

  const handleLogout = async() => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={
        `max-w-md w-full mx-auto mt-10 p-8 bg-gray-900
        bg-opacity-80 backdrop-filter backdrop-blur-lg
        rounder-xl shadow-2xl border border-gray-800`
      }
    >
      <h2 className={
        `text-3xl font-bold mb-6 text-center bg-gradient-to-br
        from-cyan-200 via-cyan-400 to-cyan-600 text-transparent bg-clip-text`
      }>
        Dashboard
      </h2>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={
            `p-4 bg-gray-800 opacity-50
            rounded-lg border border-gray-700`
          }
        >
          <h3 className="text-xl font-semibold text-sky-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300 pr-5"><span className="font-bold">Name:</span> {user.name}</p>
          <p className="text-gray-300 pr-5"><span className="font-bold">Email:</span> {user.email}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={
            `p-4 bg-gray-800 opacity-50
            rounded-lg border border-gray-700`
          }
        >
          <h3 className="text-xl font-semibold text-sky-400 mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300 pr-5"><span className="font-bold">Joined:</span> {format(user.createdAt, "MMM dd, yyyy hh:mm a")}</p>
          <p className="text-gray-300 pr-5"><span className="font-bold">Last Login:</span> {format(user.lastLogin, "MMM dd, yyyy hh:mm a")}</p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <motion.button
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        onClick={handleLogout}
        className={
          `w-full py-3 bg-gradient-to-r from-sky-500 to-cyan-600
          text-white font-bold rounded-lg shadow-lg hover:from-sky-600
          hover:to-cyan-700 focus:outline-none focus:ring-2
          focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-900`
        }
        >
          Logout
        </motion.button>

      </motion.div>

    </motion.div>
  )
}

export default HomePage