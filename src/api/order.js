import axios from '@/libs/api.request'

/**
 * 获取商品
 * @param start
 * @param limit
 * @returns {http.ClientRequest | ClientHttp2Stream | never | *}
 */
export const addOrder = ({ userId, total, payment, cartList }) => {
    const data = {
        userId, total, payment, cartList
    }
    return axios.request({
        url: '/order/add',
        data,
        method: 'post'
    })
}
