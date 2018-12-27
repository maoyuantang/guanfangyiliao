import axios from 'axios'
import url from '../enums/apiBaseURL.js'
axios.defaults.baseURL = url.developmentEnvironment
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
//axios.defaults.headers.post['def'] = 'union'
//axios.defaults.headers.get['def'] = 'union'
export default axios
