const axios = require('axios')
const API_key = process.env.API_key
class Api {
    constructor() {

        this.axiosApi = axios.create({
            baseURL: 'https://app.ticketmaster.com/discovery/v2/'
        })
    }
    getAllEvents = () => {
        return this.axiosApi.get(`/events?apikey=${API_key}&countryCode=ES`)
    }
}
module.exports = Api