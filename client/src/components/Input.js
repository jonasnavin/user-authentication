import React, { useContext } from 'react'

import { EyeClosed, Eye } from 'lucide-react'
import DataContext from '../context/DataContext'

const EyeButton = ({ isVisible, onToggle }) => {

    return (
        <button
            type='button'
            className='absolute inset-y-0 right-0 flex items-center pr-3'
            onClick={onToggle}
        >
            {isVisible ? (
                <Eye className="size-5 text-sky-500" />
            ) : (
                <EyeClosed className="size-5 text-sky-500" />
            )}
        </button>
    )
}

const Input = ({ icon: ICON, id, ...props }) => {

    const { viewPassword, setViewPassword, viewConfirmPassword, setViewConfirmPassword } = useContext(DataContext)

    const isPasswordField = id === "password" || id === "new-password"
    const isConfirmPasswordField = id === "confirm-new-password"
    const isVisible = isPasswordField ? viewPassword : isConfirmPasswordField ? viewConfirmPassword : false

    const toggleVisibility = isPasswordField
        ? () => setViewPassword(!viewPassword)
        : () => setViewConfirmPassword(!viewConfirmPassword)

    return (
        <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <ICON className="size-5 text-sky-500" />
            </div>
            <input
                {...props}
                className='w-full pl-10 pr-10 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 text-white placeholder-gray-400 transition duration-200'
            />
            {id.includes("password") && <EyeButton isVisible={isVisible} onToggle={toggleVisibility} />}
        </div>
    )
}

export default Input