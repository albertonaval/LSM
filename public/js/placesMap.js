let myMap
let id

function initMap() {
    renderMap()
    getPathId()
    getPlaces()
}


function getPathId() {
    id = location.pathname.split('/')

}

function getPlaces() {

    axios
        .get(`/api/places/${id[4]}`)
        .then(response => setMarkers(response.data))
        .catch(err => console.log(err))

}

function setMarkers(place) {
    const lat = place.location.coordinates[0]
    const lng = place.location.coordinates[1]

    new google.maps.Marker({
        map: myMap,
        position: { lat, lng },
        title: place.name
    })
}

function renderMap() {

    myMap = new google.maps.Map(
        document.getElementById('myMap'),
        {
            zoom: 16,
            center: { lat: 40.41670475287826, lng: - 3.7042989147857437 }
        }
    )
}




