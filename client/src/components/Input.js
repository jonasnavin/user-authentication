import React, { useContext } from 'react'

import { EyeClosed, Eye } from 'lucide-react'
import DataContext from '../context/DataContext'

const Input = ({ icon: ICON, ...props }) => {

    const { viewPassword, setViewPassword } = useContext(DataContext)

    return (
        <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <ICON className="size-5 text-sky-500" />
            </div>
            <input
                {...props}
                className='w-full pl-10 pr-10 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 text-white placeholder-gray-400 transition duration-200'
            />
            {props.placeholder === "Password" ? (
                <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                    onClick={() => setViewPassword(!viewPassword)}
                >
                    {viewPassword ? (
                        <Eye className="size-5 text-sky-500" />
                    ) : (
                        <EyeClosed className="size-5 text-sky-500" />
                    )}
                </button>
            ) : null}
        </div>
    )
}

export default Input