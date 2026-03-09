import { createContext, useEffect } from "react";
import axios from 'axios'

export const HealthContext = createContext()


export const HealthContextProvider = ({ children }) => {

    async function verifyUser() {
        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:3000/check/health',
            })

            const { message } = response.data;
            console.log(message)
        }
        catch (error) {
            console.error('verifyUser error', error)
        }
    }

    useEffect(() => {
        verifyUser()
    }, [])

    const value = {};

    return (
        <HealthContext.Provider value={value}>
            {children}
        </HealthContext.Provider>
    )
}