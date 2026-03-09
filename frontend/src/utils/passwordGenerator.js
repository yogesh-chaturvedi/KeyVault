

export function generatePassword({
    length = 16,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true
}) {

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const num = "0123456789";
    const sym = "!@#$%^&*()_+{}[]<>?/|";

    let characters = "";

    if (uppercase) characters += upper;
    if (lowercase) characters += lower;
    if (numbers) characters += num;
    if (symbols) characters += sym;

    if (!characters) return "";

    let password = '';
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}