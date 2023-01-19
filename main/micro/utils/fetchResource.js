export const fetchResource = url=> {
    return fetch(url).then(async res => await res.text())
}