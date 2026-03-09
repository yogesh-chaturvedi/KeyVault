// Capitalizes first letter of a single word → "facebook"  becomes "Facebook"
function capitalizeWord(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Capitalizes first letter of each word → "john doe" becomes "John Doe"
function capitalizeName(str) {
    if (!str) return "";
    return str
        .trim()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

module.exports = { capitalizeWord, capitalizeName };