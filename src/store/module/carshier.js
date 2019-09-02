import { saveCartList, getCartList, removeCartList } from '../../common/js/catch'
import deepClone from 'lodash.clonedeep'

const types = {
    SET_CART_LIST: 'SET_CART_LIST'
}

/**
 * 寻找目标下标
 * @param list {Array}
 * @param goods {Object}
 * @returns {index|number|*}
 */
function findIndex (list, goods) {
    return list.findIndex(item => {
        return item.id === goods.id
    })
}

function getTotal (list) {
    let total = 0;
    list.forEach(item => {
        total += item.price * item.amount
    })
    return total.toFixed(2)
}

export default {
    state: {
        cartList: getCartList(),
        totalPrice: 0
    },
    getters: {
        cartList: (state) => state.cartList,
        totalPrice: (state) => getTotal(state.cartList)
    },
    mutations: {
        [types.SET_CART_LIST] (state, list) {
            state.cartList = list
        }
    },
    actions: {
        addCart: ({ commit, state }, { goods }) => {
            const cartList = deepClone(state.cartList)
            let index = findIndex(cartList, goods)
            if (index >= 0) {
                cartList[index].amount++
            } else {
                cartList.push({ ...goods, amount: 1 })
            }
            commit(types.SET_CART_LIST, cartList)
            saveCartList(cartList)
        },
        clearCart: ({ commit }) => {
            commit(types.SET_CART_LIST, [])
            removeCartList()
        }
    }
}
