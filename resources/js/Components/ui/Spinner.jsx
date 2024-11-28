import React, { useState, useEffect } from 'react'

export default function Spinner({
    color = 'blue',
    size = 'md',
    showProgress = false,
    message
}) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (showProgress) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => (prevProgress + 1) % 101)
            }, 50)
            return () => clearInterval(interval)
        }
    }, [showProgress])

    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-24 h-24'
    }

    const dotSizes = {
        sm: 'w-2 h-2',
        md: 'w-4 h-4',
        lg: 'w-6 h-6'
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600">
            <div className="relative flex items-center justify-center">
                <div className={`absolute rounded-full border-4 border-t-${color}-500 border-r-transparent border-b-${color}-500 border-l-transparent ${sizeClasses[size]} animate-spin`}></div>
                <div className={`absolute rounded-full border-4 border-t-transparent border-r-${color}-500 border-b-transparent border-l-${color}-500 ${sizeClasses[size]} animate-spin-reverse`}></div>
                <div className={`absolute bg-${color}-500 ${dotSizes[size]} rounded-full animate-pulse`}></div>
                {showProgress && (
                    <div className="absolute text-sm font-semibold text-gray-700">
                        {progress}%
                    </div>
                )}
            </div>
            {message && (
                <p className="mt-4 text-gray-700 text-center max-w-xs">{message}</p>
            )}
        </div>
    )
}