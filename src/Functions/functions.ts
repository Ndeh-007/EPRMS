/**
 * It takes a string, makes it lowercase, then capitalizes the first letter and returns the result
 * @param {string} value - string - This is the value that will be passed into the function.
 * @returns The first letter of the string is being capitalized and the rest of the string is being
 * returned in lowercase.
 */
function capitalizeString(value:string){ 
    const lower = value.toLowerCase();
    return value.charAt(0).toUpperCase() + lower.slice(1);
}
 

export {capitalizeString}