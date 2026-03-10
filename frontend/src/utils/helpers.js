import { useContext } from "react";
import { PasswordContext } from "../context/PasswordContext";


const useFilterPasswords = () => {

    const { passwords } = useContext(PasswordContext);


    let socialVault = passwords?.filter((item) => item.category === "Social");
    let appVault = passwords?.filter((item) => item.category === "App");
    let walletVault = passwords?.filter((item) => item.category === "Wallet");

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