import { useContext } from "react";
import { PasswordContext } from "../context/PasswordContext";


const useFilterPasswords = () => {

    const { passwords, results } = useContext(PasswordContext);

    const displayPasswords = results && results.length > 0 ? results : passwords;

    let socialVault = displayPasswords?.filter((item) => item.category === "Social");
    let appVault = displayPasswords?.filter((item) => item.category === "App");
    let walletVault = displayPasswords?.filter((item) => item.category === "Wallet");

    return { socialVault, appVault, walletVault };
}

function getSiteName(url) {
    try {
        const { hostname } = new URL(url);
        return hostname.replace("www.", "").split(".")[0];;
    } catch {
        return url;
    }
}


export default { useFilterPasswords, getSiteName };