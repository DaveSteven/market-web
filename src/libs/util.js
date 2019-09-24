import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'

/**
 * 格式化金额
 * @param number
 * @returns {string}
 */
export const parseMoney = (number) => {
    return Number.parseFloat(number).toFixed(2)
}

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

export const zeroFill = (number) => {
    return number < 10 ? `0${number}` : number
}

/**
 * 获取编号
 * @param index
 * @param start
 * @param limit
 * @returns {*}
 */
export const getSerialNumber = (index, start, limit) => {
    const serialNumber = limit * (start - 1) + index + 1
    return zeroFill(serialNumber)
}
