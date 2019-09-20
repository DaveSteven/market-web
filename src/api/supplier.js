import axios from '@/libs/api.request'

/**
 * 添加供应商
 * @param name
 * @param phone
 * @returns {ClientRequest | ClientHttp2Stream | never | *}
 */
export const addSupplier = ({ name, phone }) => {
    const data = {
        name,
        phone
    }

    return axios.request({
        url: '/supplier/add',
        method: 'post',
        data
    })
}

/**
 * 获取供应商列表
 * @param start
 * @param limit
 * @returns {ClientRequest | ClientHttp2Stream | never | *}
 */
export const getSupplierList = ({ start = 0, limit = 0 }) => {
    const data = {
        start,
        limit
    }

    return axios.request({
        url: '/supplier/getList',
        method: 'post',
        data
    })
}
