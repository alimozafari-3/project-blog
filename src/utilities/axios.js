import axios from 'axios'

axios.defaults.baseURL="https://blog-api.codeyad-project.ir/"

export default {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    delete:axios.delete
}