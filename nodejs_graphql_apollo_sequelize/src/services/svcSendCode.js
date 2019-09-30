import { smsProviderUrl } from '../config'
import axios from 'axios'
export default (code, target, fromName, text) =>{
    const from = fromName
    const to = target
    let txt = text.replace('$code', code)
    txt = txt.replace(/ /g, '+')
    const url = smsProviderUrl +  '&from=' + from + '&to=' + to + '&text=' + txt
    return axios.get(url)
}