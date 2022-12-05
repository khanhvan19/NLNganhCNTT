import { 
    faArrowRightFromBracket, 
    faKey, 
    faClipboardCheck,
    faChartLine,
    faBarsStaggered,
    faBookBookmark,
    faCartFlatbed,
    faCaretRight
} from "@fortawesome/free-solid-svg-icons";
import { 
    faUser, 
    faAddressBook, 
    faCircleQuestion,
    faCircleUser,
} from "@fortawesome/free-regular-svg-icons";

export const SET_IS_LOGIN = 'set_is_login'
export const SET_SEARCH_VALUE = 'set_search_value'
export const SET_SEARCH_RESULT = 'set_search_result'
export const SET_ALL_CATEGORYS = 'set_all_categorys'
export const SET_SLUG_SUBCATEGORYS = 'set_slug_subcategorys'
export const SET_PRODUCT_CART = 'set_product_cart'
export const SET_HISTORY = 'set_history'

export const DEFAULT_ADVANCE_MENU = [
    { icon: {}, name: '', type: 'theme'},
    { icon: faCircleQuestion, name: 'Trợ giúp - phản hồi', to: '/contact' },
];

export const SINGED_ADVANCE_MENU = [
    {
        icon: faUser, 
        name: 'Tài khoản của tôi', 
        children: { data: [
            {icon: faAddressBook, name: 'Xem hồ sơ', type: 'account'},
            {icon: faKey, name: 'Đổi mật khẩu', type: 'account'},
            {icon: faClipboardCheck, name: 'Đơn đặt hàng', to: '/order', type: 'order'}
        ]}
    },
    ...DEFAULT_ADVANCE_MENU,
    { icon: faArrowRightFromBracket, name: 'Đăng xuất',to: '/login', type: 'logout' , separate: true}
]

export const SORT_ITEM = [
    {title: 'Mới nhất', value: 'createdAt:desc'},
    {title: 'Bán chạy', value: 'sold:desc'},
    {title: 'Giá thấp', value: 'price:asc'},
    {title: 'Giá cao', value: 'price:desc'}
]
export const ORDER_ITEM = [
    {title: 'Đang xử lý', value: 'Đang xử lý'},
    {title: 'Đang vận chuyển', value: 'Đang vận chuyển'},
    {title: 'Đã hoàn thành', value: 'Đã hoàn thành'},
    {title: 'Đã hủy', value: 'Đã hủy'}
]

export const ADMIN_SIDEBAR = [
    { icon: faChartLine, name: 'Dashboard', to: '/admin/' },
    { icon: faBarsStaggered, name: 'Categorys', children: [
        { icon: faCaretRight, name: 'Categorys', to: '/admin/category' },
        { icon: faCaretRight, name: 'Sub-Categorys', to: '/admin/sub-category' },
    ]},
    { icon: faBookBookmark, name: 'Products', children: [
        { icon: faCaretRight, name: 'Products', to: '/admin/product' },
        { icon: faCaretRight, name: 'Images', to: '/admin/image' },
        { icon: faCaretRight, name: 'Comments', to: '/admin/comment' },
    ]},
    { icon: faCartFlatbed, name: 'Orders', to: '/admin/order' },
    { icon: faCircleUser, name: 'Users', to: '/admin/user' },
]