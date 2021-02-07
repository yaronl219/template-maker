export const utilService = {
    areObjectsIdentical,
    capText
}

function areObjectsIdentical(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
}   

function capText(text) {
    return text[0].toUpperCase() + text.substring(1)
}