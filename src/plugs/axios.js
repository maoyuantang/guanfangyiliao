import axios from 'axios'
import data from '../enums/enums.js'
axios.defaults.baseURL = data.baseApiURL
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
//axios.defaults.headers.post['def'] = 'union'
//axios.defaults.headers.get['def'] = 'union'
export default axios
