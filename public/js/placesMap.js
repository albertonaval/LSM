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


function renderMap() {

    myMap = new google.maps.Map(
        document.getElementById('myMap'),
        {
            zoom: 16,
            center: {
                lat: 40.436055111449235, lng: - 3.716630605587715
            }
        }
    )
}

