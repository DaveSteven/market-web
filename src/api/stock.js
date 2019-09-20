import axios from '@/libs/api.request'

/**
 * 商品入库
 * @param goodsId
 * @param channelId
 * @param amount
 * @param price
 * @returns {ClientRequest | ClientHttp2Stream | never | *}
 */
export const addStock = ({ goodsId, channelId, amount, price }) => {
    const data = { goodsId, channelId, amount, price }

    return axios.request({
        url: '/stock/add',
        method: 'post',
        data
    })
}

/**
 * 获取库存
 * @param start
 * @param limit
 * @returns {ClientRequest | ClientHttp2Stream | never | *}
 */
export const getStockList = ({ start = 0, limit = 0 }) => {
    const data = {
        start, limit
    }

    return axios.request({
        url: '/stock/getList',
        method: 'post',
        data
    })
}
