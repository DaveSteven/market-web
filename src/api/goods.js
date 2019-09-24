import axios from '@/libs/api.request'

/**
 * 根据编码获取商品信息
 * @param code
 * @returns {http.ClientRequest | ClientHttp2Stream | never | *}
 */
export const getGoodsByCode = ({ code }) => {
    const params = {
        code
    }
    return axios.request({
        url: '/goods/getGoodsByCode',
        params,
        method: 'get'
    })
}
