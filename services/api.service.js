const axios = require('axios')

class Api {
    constructor() {
        this.axiosApi = axios.create({
            baseURL: 'https://app.ticketmaster.com/discovery/v2/'
        })
    }
    getAllEvents = () => {
        return this.axiosApi.get('/events?apikey=pUDD8o188KgcUubCfGLUnWueZnqcU8r7&countryCode=ES')
    }
}
module.exports = Api