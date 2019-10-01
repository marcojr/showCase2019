import { nodeAPI } from '../config/servers'
import axios from 'axios'
export default async (format) => {
  const url = nodeAPI + 'setPictureForUpload?format=' + format
  return await axios.get(url)
}
