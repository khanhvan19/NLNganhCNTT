import {
    SET_IS_LOGIN,
    SET_SEARCH_VALUE,
    SET_SEARCH_RESULT,
    SET_ALL_CATEGORYS,
    SET_SLUG_SUBCATEGORYS,
    SET_PRODUCT_CART,
    SET_HISTORY,
} from './constant'

const initState = { 
    isLogin: false,
    searchValue: "",
    searchResult: [],
    allCategorys: [],
    subCategorys: '',
    productsCart: [],
    history: '',
}

function reducer(state, action) {
    switch (action.type) {
        case SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }
        case SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.payload
            }
        case SET_SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.payload
            }
        case SET_ALL_CATEGORYS:
            return {
                ...state,
                allCategorys: action.payload
            }
        case SET_SLUG_SUBCATEGORYS:
            return {
                ...state,
                subcategorys: action.payload
            }
        case SET_PRODUCT_CART:
            return {
                ...state,
                productsCart: action.payload
            }
        case SET_HISTORY:
            return {
                ...state,
                history: action.payload
            }
        default:
            throw new Error('Invalid action')
    }
}

export { initState }
export default reducer