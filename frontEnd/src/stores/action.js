import { 
    SET_IS_LOGIN,
    SET_SEARCH_VALUE,
    SET_SEARCH_RESULT,
    SET_ALL_CATEGORYS,
    SET_SLUG_SUBCATEGORYS,
    SET_PRODUCT_CART,
    SET_HISTORY,
} from './constant'

export const setIsLogin = (payload) => ({
    type: SET_IS_LOGIN,
    payload
})

export const setSearchValue = (payload) => ({
    type: SET_SEARCH_VALUE,
    payload
})

export const setSearchResult = (payload) => ({
    type: SET_SEARCH_RESULT,
    payload
})

export const setAllCategorys = (payload) => ({
    type: SET_ALL_CATEGORYS,
    payload
})

export const setSlugSubcategorys = (payload) => ({
    type: SET_SLUG_SUBCATEGORYS,
    payload
})

export const setProductsCart = (payload) => ({
    type: SET_PRODUCT_CART,
    payload
})

export const setHistory = (payload) => ({
    type: SET_HISTORY,
    payload
})