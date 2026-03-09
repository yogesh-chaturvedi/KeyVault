import axios from "axios"


export const addPassword = async (data) => {
    const resposne = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASE_URL}/api/password/add`,
        data: data,
        withCredentials: true
    })
    return resposne.data;
}

export const revealPassword = async (passId) => {
    const resposne = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASE_URL}/api/password/reveal/${passId}`,
        withCredentials: true
    })
    return resposne.data;
}

export const fetchSinglePassword = async (passId) => {
    const resposne = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASE_URL}/api/password/fetchSingle/${passId}`,
        withCredentials: true
    })
    return resposne.data;
}


export const editPassword = async (userData, passId) => {
    const resposne = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASE_URL}/api/password/editPassword/${passId}`,
        data: userData,
        withCredentials: true
    })
    return resposne.data;
}

export const removePassword = async (passId) => {
    const resposne = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASE_URL}/api/password/removePassword/${passId}`,
        withCredentials: true
    })
    return resposne.data;
}


export const searchPassword = async (query) => {
    const resposne = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASE_URL}/api/password/seach?search=${query}`,
        withCredentials: true
    })
    return resposne.data;
}

export const passwordStats = async () => {
    const resposne = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASE_URL}/api/password/passStats`,
        withCredentials: true
    })
    return resposne.data;
}