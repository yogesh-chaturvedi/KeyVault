import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
    const [passwords, setPasswords] = useState(null);
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);

    const { user, vaultUnlocked } = useContext(AuthContext);

    const fetchPasswords = async () => {
        try {

            const response = await axios({
                method: 'get',
                url: `http://localhost:3000/api/password/fetch`,
                withCredentials: true
            })

            setPasswords(response.data.userPasswords);
            setResults(response.data.userPasswords);
        } catch (error) {
            setPasswords(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user || !vaultUnlocked) {
            setPasswords(null);
            setResults([]);
            return;
        }
        fetchPasswords();
    }, [user, vaultUnlocked]);

    return (
        <PasswordContext.Provider value={{ passwords, setPasswords, loading, fetchPasswords, results, setResults }}>
            {children}
        </PasswordContext.Provider>
    );
};