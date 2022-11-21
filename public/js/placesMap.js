let myMap
let id

function initMap() {
    getPathId()
    getPlaces()
}


function getPathId() {
    id = location.pathname.split('/')

}

function getPlaces() {

    axios
        .get(`/api/places/${id[4]}`)
        .then(response => {
            //console.log('DATA', response.data)
            renderMap(response.data)
        })
        .catch(err => console.log(err))

}

function setMarkers(place) {
    //console.log('setMarkers')
    let lat = place.location.coordinates[0]
    let lng = place.location.coordinates[1]

    new google.maps.Marker({
        map: myMap,
        position: { lat, lng },
        title: place.name
    })
}


function renderMap(place) {
    // console.log('renderMap')
    // console.log(place)
    let lat = place.location.coordinates[0]
    let lng = place.location.coordinates[1]

    myMap = new google.maps.Map(
        document.getElementById('myMap'),
        {
            zoom: 14,
            center: {
                lat: lat, lng: lng
            }
        }
    )

    setMarkers(place)
}


