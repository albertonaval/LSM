let detailsMap
let id

function initMap() {
    getPathId()
    getPlaces()
}


function getPathId() {
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    id = location.pathname.split('/')
    while (id.length > 1) {
        id.shift()
    }
}

function getPlaces() {

    axios
        .get(`/api/places/${id}`)
        .then(response => {
            //console.log('DATA', response.data)
            renderMap(response.data)
        })
        .catch(err => console.log(err))

}

function setMarkers(place) {

    let lat = place.location.coordinates[0]
    let lng = place.location.coordinates[1]

    new google.maps.Marker({
        map: detailsMap,
        position: { lat, lng },
        title: place.name,
        icon: {
            path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            scale: 1.5,
            strokeWeight: 1.5,
            fillColor: 'purple',
            fillOpacity: 0.6
        }
    })
}


function renderMap(place) {
    // console.log('renderMap')
    // console.log(place)
    let lat = place.location.coordinates[0]
    let lng = place.location.coordinates[1]

    detailsMap = new google.maps.Map(
        document.getElementById('detailsMap'),
        {
            zoom: 15,
            center: {
                lat, lng
            },
            disableDefaultUI: true,
            styles: mapStyles.aubergine
        }
    )

    setMarkers(place)
}