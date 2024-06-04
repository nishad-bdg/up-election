import axios from 'axios'
import config from '../config/axios.config'

const axiosInstance = axios.create(config)

export default axiosInstance
