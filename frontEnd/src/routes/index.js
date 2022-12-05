import * as Views from '../views'

const routes = [
    {path: '/', view: Views.Home, layout: 'user'},
    {path: '/contact', view: Views.Contact, layout: 'user'},
    {path: '/login', view: Views.Login, layout: 'user'},    
    {path: '/register', view: Views.Register, layout: 'user'}, 
    {path: '/search', view: Views.SearchView, layout: 'user'},
    {path: '/product', view: Views.Product, layout: 'user'},
    {path: '/product/:slug', view: Views.Product, layout: 'user'},
    {path: '/detail/:id', view: Views.Detail, layout: 'user'},
    {path: '/cart', view: Views.Cart, layout: 'user'},
    {path: '/order', view: Views.Order, layout: 'user'},
    {path: '/order/:id', view: Views.OrderDetail, layout: 'user'},

    {path: '/admin/', view: Views.AdminDashboard, layout: 'admin'},
    {path: '/admin/category', view: Views.AdminCategory, layout: 'admin'},
    {path: '/admin/', view: Views.AdminCategory, layout: 'admin'},
    {path: '/admin/category', view: Views.AdminCategory, layout: 'admin'},
    {path: '/admin/sub-category', view: Views.AdminSubCategory, layout: 'admin'},
    {path: '/admin/product', view: Views.AdminProduct, layout: 'admin'},
    {path: '/admin/image', view: Views.AdminImages, layout: 'admin'},
    {path: '/admin/comment', view: Views.AdminCategory, layout: 'admin'},
    {path: '/admin/order', view: Views.AdminOrder, layout: 'admin'},
    {path: '/admin/user', view: Views.AdminUser, layout: 'admin'},
    {path: '/admin/login', view: Views.AdminLogin},
]

export {routes}