export const patternCreator = str => {
    const pattern = str.split("").map((char) => {
        if (char === "\\") return ''
        return `(?=.*${char})`
    }).join("")
    return pattern
}