import storage from 'good-storage'

/**
 * 存取购物车列表
 * @type {string}
 */
const CART_KEY = '__cartList__'
export const saveCartList = (list) => {
    storage.session.set(CART_KEY, list)
}

export const getCartList = () => {
    return storage.session.get(CART_KEY, [])
}

export const removeCartList = () => {
    return storage.session.remove(CART_KEY)
}
