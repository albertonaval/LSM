

const ironhack = {
    coords: { lat: 41.39770923787243, lng: 2.1904346252331703 },
    title: 'Ironhack BCN'
}

let myMap

function initMap() {
    getLocaltion()
    renderMap()
}

function getLocaltion() {

    navigator.geolocation.getCurrentPosition(
        position => placeMap(position),
        error => console.log('ERROR', error)
    )
}

function placeMap({ coords }) {

    const { latitude: lat, longitude: lng } = coords
    myMap.setCenter({ lat, lng })

    new google.maps.Marker({
        position: { lat, lng },
        map: myMap
    })
}


function renderMap() {

    myMap = new google.maps.Map(
        document.querySelector('#myMap'),
        { zoom: 13, center: ironhack.coords }
    )
}