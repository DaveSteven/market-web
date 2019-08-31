import axios from '@/libs/api.request'

// 获取分类
export const getCategoryList = () => {
    return axios.request({
        url: '/category/getList',
        method: 'post'
    })
}

// 添加分类
export const addCategory = ({ name }) => {
    const data = {
        name
    }
    return axios.request({
        url: '/category/add',
        data,
        method: 'post'
    })
}

// 删除分类
export const deleteCategory = ({ id }) => {
    const data = {
        id
    }
    return axios.request({
        url: '/category/delete',
        data,
        method: 'post'
    })
}

// 编辑分类
export const editCategory = ({ id, name }) => {
    const data = {
        id,
        name
    }
    return axios.request({
        url: '/category/edit',
        data,
        method: 'post'
    })
}
