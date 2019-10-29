export function checkEmptyArray (array) {
    return array && Array.isArray(array) && array.length === 0;
}

// how to add a property to Array.prototype chain?
export function checkNonEmptyArray (array) {
    return array && Array.isArray(array) && array.length > 0;
}