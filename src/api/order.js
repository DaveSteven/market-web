import axios from '@/libs/api.request'

/**
 * 获取商品
 * @param start
 * @param limit
 * @returns {http.ClientRequest | ClientHttp2Stream | never | *}
 */
export const addOrder = ({ employeeId = 1, total, payment, cartList }) => {
    const data = {
        employeeId, total, payment, cartList
    }
    return axios.request({
        url: '/order/add',
        data,
        method: 'post'
    })
}
