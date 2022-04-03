import axios from 'axios'
import { ENV_CONFIG } from '../EnvConfig'

export default axios.create({
  baseURL: `${ENV_CONFIG.GITHUB_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
})
