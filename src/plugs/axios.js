import axios from 'axios'
import url from '../enums/apiBaseURL.js'
// axios.defaults.baseURL = url.developmentEnvironment
// axios.defaults.baseURL = 'http://localhost:3000/users'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8"
//axios.defaults.headers.post['def'] = 'union'
//axios.defaults.headers.get['def'] = 'union'
export default axios
