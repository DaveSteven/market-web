import axios from '@/libs/api.request'

/**
 * 获取库存列表
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
