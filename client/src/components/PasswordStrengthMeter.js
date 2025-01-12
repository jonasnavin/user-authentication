import { Check, X } from "lucide-react"

const PasswordCriteria = ({ password }) => {

    const criteria = [
        { label: "At least 8 characters", passed: password.length >= 8 },
        { label: "Contains uppercase letters", passed: /[A-Z]/.test(password) },
        { label: "Contains lowercase letters", passed: /[a-z]/.test(password) },
        { label: "Contains a number", passed: /\d/.test(password) },
        { label: "Contains special character", passed: /[^A-Za-z\d]/.test(password) },
    ]

    return (
        <div className="mt-2 space-y-1">
            {criteria.map(item => (
                <div key={item.label} className="flex items-center text-xs">
                    {item.passed ? (
                        <Check className="size-4 text-green-500 mr-2" />
                    ) : (
                        <X className="size-4 text-gray-500 mr-2" />
                    )}
                    <span className={item.passed ? "text-green-500" : "text-gray-400"}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    )
}



const PasswordStrengthMeter = ({ password }) => {

    const getStrength = (pass) => {
        let strengthScore = 0
        if (pass.length >= 8) strengthScore++
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strengthScore++
        if (pass.match(/[^A-Za-z\d]/)) strengthScore++
        if (pass.match(/[\d]/)) strengthScore++
        return strengthScore
    }

    const strength = getStrength(password)

    const getcolor = (strength) => {
        if (strength === 0) return "bg-red-500"
        if (strength === 1) return "bg-red-400"
        if (strength === 2) return "bg-yellow-500"
        if (strength === 3) return "bg-yellow-400"
        return "bg-green-500"
    }

    const getStrengthText = (strength) => {
        if (strength === 0) return "Very weak"
        if (strength === 1) return "Weak"
        if (strength === 2) return "Fair"
        if (strength === 3) return "Good"
        return "Strong"
    }

    return (
        <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">
                    Password Strength
                </span>
                <span className="text-xs text-gray-400">
                    {getStrengthText(strength)}
                </span>
            </div>
            <div className="flex space-x-1">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getcolor(strength) : "bg-gray-600"}`}
                    />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    )
}

export default PasswordStrengthMeter