let myMap

function initMap() {
    renderMap()
    getPlaces()
}


function getPlaces() {

    axios
        .get('/disco-details/:places_id')
        .then(response => setMarkers(response.data))
        .catch(err => console.log(err))
}


function setMarkers(places) {

    places.forEach(elm => {

        const lat = elm.location.coordinates[0]
        const lng = elm.location.coordinates[1]

        new google.maps.Marker({
            map: myMap,
            position: { lat, lng },
            title: elm.name
        })
    })
}


function renderMap(places) {

    places.forEach(elm => {

        const lat = elm.location.coordinates[0]
        const lng = elm.location.coordinates[1]
        const id = elm._id
        myMap = new google.maps.Map(
            document.getElementById(_id),
            {
                zoom: 16,
                center: {
                    lat, lng
                }
            }
        )
    })
}


