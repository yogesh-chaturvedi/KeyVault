import axios from "axios";

// signup api
export const signupUser = async (userData) => {
    const resposne = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
        data: userData
    })
    return resposne.data;
}

// login api
export const loginUser = async (userData) => {
    const resposne = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        data: userData,
        withCredentials: true
    })
    return resposne.data;
}

// logout api
export const logoutUser = async () => {
    const resposne = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        withCredentials: true
    })
    return resposne.data;
}

// unlock vault api
export const unlockVault = async (userData) => {
    const resposne = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL}/api/unlock/vault`,
        data: { masterPass: userData },
        withCredentials: true
    })
    return resposne.data;
}