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
