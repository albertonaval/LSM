
const madridCenter = {
    coords: { lat: 40.4167910787894, lng: -3.7037886442178833 },
    title: 'Kilometro 0'
}

let mainMap

function initMap() {
    renderMap()
    getLocation()
    getPlacesandSetMarkers()

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
        const { lat, lng } = elm.location.coordinates
        // const lng = elm.location.coordinates[1]

        new google.maps.Marker({
            map: mainMap,
            position: { lat, lng },
            title: elm.name,
            radius: 5000
        })
    })
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
        map: mainMap,
        icon: {
            path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            scale: 1.5,
            strokeWeight: 1.5,
            fillColor: '#f706b6',
            fillOpacity: 0.6
        }
    })
}

function getPlacesandSetMarkers() {

    axios
        .get('/api/places')
        //console.log('/api/places')
        .then(response => response.data.forEach(res => {
            const [lat, lng] = res.location.coordinates
            new google.maps.Marker({
                map: mainMap,
                position: { lat, lng },
                title: res.name,
                icon: {
                    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                    scale: 1.5,
                    strokeWeight: 1.5,
                    fillColor: 'yellow',
                    fillOpacity: 0.6
                }
            })
        }))
        .catch(err => console.log(err))
}

function renderMap() {

    mainMap = new google.maps.Map(
        document.getElementById('mainMap'),
        {
            zoom: 12,
            center: madridCenter.coords,
            styles: mapStyles.aubergine,
            disableDefaultUI: true
        }
    )
}

