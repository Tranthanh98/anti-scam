
let i = 1
function dummyDataHighlight(title, path, createdDate = new Date()){
    return {
        id : i++,
        title,
        path,
        createdDate
    }
}

export default [
    dummyDataHighlight("Trang web này cực xịn", "google.com"),
    dummyDataHighlight("Link fb này cực xinh", "google.com"),
    dummyDataHighlight("Trang web này cực xịn", "google.com"),
]