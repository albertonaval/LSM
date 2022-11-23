

const madrid = {
    coords: { lat: 40.4167910787894, lng: -3.7037886442178833 },
    title: 'Kilometro 0'
}

let myMap

function initMap() {
    getPlaces()
    getLocaltion()
    renderMap()
}

function getLocaltion() {

    navigator.geolocation.getCurrentPosition(
        position => placeMap(position),
        error => console.log('ERROR', error)
    )
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

function placeMap({ coords }) {

    const { latitude: lat, longitude: lng } = coords
    myMap.setCenter({ lat, lng })

    new google.maps.Marker({
        position: { lat, lng },
        map: myMap,
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png"
        }
    })
}



function renderMap() {

    myMap = new google.maps.Map(
        document.querySelector('#mainMap'),
        { zoom: 13, center: ironhack.coords, styles: mapStyle.aubergine }

    )
}