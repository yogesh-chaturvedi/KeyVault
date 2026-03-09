import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [vaultUnlocked, setVaultUnlocked] = useState(false);

    const checkAuth = async () => {
        try {

            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}/api/auth/me`,
                withCredentials: true
            })

            setUser(response.data.user);

            // to check vault status 
            await checkVaultStatus();

        } catch (error) {
            setUser(null);
            setVaultUnlocked(false)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        checkAuth();
    }, []);



    async function checkVaultStatus() {
        try {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_BASE_URL}/api/unlock/status`,
                withCredentials: true
            })
            // console.log('vault status response', response.data);

            setVaultUnlocked(response.data.unlocked);
        }
        catch (error) {
            console.error('checkVaultStatus failed', error)
            setVaultUnlocked(false)
        }
    }


    return (
        <AuthContext.Provider value={{ user, setUser, loading, vaultUnlocked, setVaultUnlocked }}>
            {children}
        </AuthContext.Provider>
    );
};