import axios from '@/libs/api.request'

/**
 * 获取商品
 * @param start
 * @param limit
 * @returns {http.ClientRequest | ClientHttp2Stream | never | *}
 */
export const getGoodsList = ({ start, limit }) => {
    const data = {
        start, limit
    }
    return axios.request({
        url: '/goods/getList',
        data,
        method: 'post'
    })
}

/**
 * 添加商品
 * @param code 商品编码
 * @param name 商品名称
 * @param price 单价
 * @param amount 数量
 * @param type_id 分类id
 * @returns {http.ClientRequest | ClientHttp2Stream | never | *}
 */
export const addGoods = ({ code, name, price, amount, typeId }) => {
    const data = {
        code, name, price, amount, typeId
    }
    return axios.request({
        url: '/goods/add',
        data,
        method: 'post'
    })
}

/**
 * 删除商品
 * @param id
 * @returns {http.ClientRequest | ClientHttp2Stream | never | *}
 */
export const deleteGoods = ({ id }) => {
    const data = {
        id
    }
    return axios.request({
        url: '/goods/delete',
        data,
        method: 'post'
    })
}

/**
 * 修改商品
 * @param id
 * @param code
 * @param name
 * @param price
 * @param amount
 * @returns {http.ClientRequest | ClientHttp2Stream | never | *}
 */
export const editGoods = ({ id, code, name, price, amount, typeId }) => {
    const data = {
        id, code, name, price, amount, typeId
    }
    return axios.request({
        url: '/goods/edit',
        data,
        method: 'post'
    })
}