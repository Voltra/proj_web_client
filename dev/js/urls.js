/**
 * A function retrieving the url to an asset based on its uri
 * @param {string} uri - The uri of the desired asset
 * @return {string} The url to the desired asset
 */
export function asset(uri){
    return `assets/${uri}`
}

/**
 * A function retrieving the url to an image based on its uri
 * @param {string} uri - The uri of the desired image
 * @return {string} The url to the desired image
 */
export function img(uri){
    return asset(`img/${uri}`);
}

/**
 * A function retrieving the url to a json file based on its uri
 * @param {string} uri - The uri to the desired json file
 * @return {string} The url to the desired json file
 */
export function json(uri){
    return asset(`json/${uri}`)
}