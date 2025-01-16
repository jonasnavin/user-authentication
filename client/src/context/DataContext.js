import { createContext, useState } from "react";

const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [viewPassword, setViewPassword] = useState(false)

    return (
        <DataContext.Provider value={{
            name, setName,
            email, setEmail,
            password, setPassword,
            code, setCode,
            viewPassword, setViewPassword
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext