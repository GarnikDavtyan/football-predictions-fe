export default function getImageFullUrl(path) {
    return process.env.REACT_APP_API_URL + '/storage/' + path;
}