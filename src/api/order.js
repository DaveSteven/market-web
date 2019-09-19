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

/**
 * 获取订单列表
 * @param start
 * @param limit
 * @returns {http.ClientRequest | ClientHttp2Stream | never | *}
 */
export const getOrderList = ({ start = 0, limit = 10 }) => {
    const data = {
        start,
        limit
    }
    return axios.request({
        url: '/order/getList',
        data,
        method: 'post'
    })
}

/**
 * 获取订单信息
 * @param orderId
 * @returns {http.ClientRequest | ClientHttp2Stream | never | *}
 */
export const getOrderInfo = ({ orderId }) => {
    return axios.request({
        url: '/order/getInfo',
        params: {
            orderId
        },
        method: 'get'
    })
}
