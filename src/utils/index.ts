export function snakeToCamel(str: string) {
    return str.replace(/-([a-z])/g, function (match, letter) {
        return letter.toUpperCase();
    });
}
export const cloneObject = (value: any) => Object.assign({}, value)

export function generateRandomString(length: number) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += String.fromCharCode(characters.charCodeAt(randomIndex));
    }

    return result;
}
