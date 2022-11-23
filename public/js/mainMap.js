

const madrid = {
    coords: { lat: 40.4167910787894, lng: -3.7037886442178833 },
    title: 'Kilometro 0'
}

let mainMap

function initMap() {
    getLocation()
    getPlaces()
    renderMap()
}

function getLocation() {

    navigator.geolocation.getCurrentPosition(
        position => placeMap(position),
        error => console.log('ERROR', error)
    )
}

function placeMap({ coords }) {

    const { latitude: lat, longitude: lng } = coords
    mainMap.setCenter({ lat, lng })

    new google.maps.Marker({
        position: { lat, lng },
        map: mainMap
    })
}

function getPlaces() {

    axios
        .get('/api/places')
        //console.log('/api/places')
        .then(response => setMarkers(response.data))
        .catch(err => console.log(err))
}

function setMarkers(places) {

    places.forEach(elm => {
        const lat = elm.location.coordinates[0]
        const lng = elm.location.coordinates[1]

        new google.maps.Marker({
            map: mainMap,
            position: { lat, lng },
            title: elm.name
        })
    })
}


function renderMap() {

    myMap = new google.maps.Map(
        document.getElementById('mainMap'),
        { zoom: 13, center: madrid.coords, styles: mapStyles.aubergine }
    )
}