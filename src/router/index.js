// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';

// 用户页面组件
const AppLogin = () => import('@/pages/User/AppLogin.vue');
const UserInfo = () => import('@/pages/User/UserInfo.vue');
const UserBookOverview = () => import('@/pages/User/BookOverview.vue');
const UserBookDetail = () => import('@/pages/User/BookDetail.vue');
const BorrowBook = () => import('@/pages/User/BorrowBook.vue');
const ReturnBook = () => import('@/pages/User/ReturnBook.vue');
const CollectionInfo = () => import('@/pages/User/CollectionInfo.vue');

// 管理员页面组件
const AdminInfo = () => import('@/pages/Admin/AdminInfo.vue');
const BorrowApproval = () => import('@/pages/Admin/BorrowApproval.vue');
const ReturnApproval = () => import('@/pages/Admin/ReturnApproval.vue');
const ManageBooks = () => import('@/pages/Admin/ManageBooks.vue');
const BookDetails = () => import('@/pages/Admin/BookDetails.vue');
const BorrowingHistory = () => import('@/pages/Admin/BorrowingHistory.vue');

// 超级管理员页面组件
const CreateLibrarian = () => import('@/pages/SuperAdmin/CreateLibrarian.vue');
const LibrarianList = () => import('@/pages/SuperAdmin/LibrarianList.vue');
const SuperAdminBookOverview = () => import('@/pages/SuperAdmin/BookOverview.vue');
const SuperAdminBookDetail = () => import('@/pages/SuperAdmin/BookDetail.vue');
const LibrarianApprovalList = () => import('@/pages/SuperAdmin/LibrarianApprovalList.vue');

// 404 页面
const NotFound = () => import('@/pages/NotFound.vue');

// 定义路由配置
const routes = [
    // 用户相关路由
    {
        path: '/login',
        name: 'AppLogin',
        component: AppLogin,
    },
    {
        path: '/user/info',
        name: 'UserInfo',
        component: UserInfo,
        meta: { requiresAuth: true, roles: ['user'] },
    },
    {
        path: '/user/book-overview',
        name: 'UserBookOverview',
        component: UserBookOverview,
        meta: { requiresAuth: true, roles: ['user'] },
    },
    {
        path: '/user/book-detail/:bookId',
        name: 'UserBookDetail',
        component: UserBookDetail,
        meta: { requiresAuth: true, roles: ['user'] },
        props: true,
    },
    {
        path: '/user/borrow-book',
        name: 'BorrowBook',
        component: BorrowBook,
        meta: { requiresAuth: true, roles: ['user'] },
    },
    {
        path: '/user/return-book',
        name: 'ReturnBook',
        component: ReturnBook,
        meta: { requiresAuth: true, roles: ['user'] },
    },
    {
        path: '/user/collection',
        name: 'CollectionInfo',
        component: CollectionInfo,
        meta: { requiresAuth: true, roles: ['user'] },
    },

    // 管理员相关路由
    {
        path: '/admin/info',
        name: 'AdminInfo',
        component: AdminInfo,
        meta: { requiresAuth: true, roles: ['admin', 'superadmin'] },
    },
    {
        path: '/admin/borrow-approval',
        name: 'BorrowApproval',
        component: BorrowApproval,
        meta: { requiresAuth: true, roles: ['admin', 'superadmin'] },
    },
    {
        path: '/admin/return-approval',
        name: 'ReturnApproval',
        component: ReturnApproval,
        meta: { requiresAuth: true, roles: ['admin', 'superadmin'] },
    },
    {
        path: '/admin/manage-books',
        name: 'ManageBooks',
        component: ManageBooks,
        meta: { requiresAuth: true, roles: ['admin', 'superadmin'] },
    },
    {
        path: '/admin/book-details/:bookId',
        name: 'BookDetails',
        component: BookDetails,
        meta: { requiresAuth: true, roles: ['admin', 'superadmin'] },
        props: true,
    },
    {
        path: '/admin/borrowing-history/:bookId',
        name: 'BorrowingHistory',
        component: BorrowingHistory,
        meta: { requiresAuth: true, roles: ['admin', 'superadmin'] },
        props: true, // 允许将路由参数作为 prop 传递给组件
    },

    // 超级管理员相关路由
    {
        path: '/superadmin/create-librarian',
        name: 'CreateLibrarian',
        component: CreateLibrarian,
        meta: { requiresAuth: true, roles: ['superadmin'] },
    },
    {
        path: '/superadmin/librarian-list',
        name: 'LibrarianList',
        component: LibrarianList,
        meta: { requiresAuth: true, roles: ['superadmin'] },
    },
    {
        path: '/superadmin/book-overview',
        name: 'SuperAdminBookOverview',
        component: SuperAdminBookOverview,
        meta: { requiresAuth: true, roles: ['superadmin'] },
    },
    {
        path: '/superadmin/book-detail/:bookId',
        name: 'SuperAdminBookDetail',
        component: SuperAdminBookDetail,
        meta: { requiresAuth: true, roles: ['superadmin'] },
        props: true,
    },
    {
        path: '/superadmin/librarian-approval',
        name: 'LibrarianApprovalList',
        component: LibrarianApprovalList,
        meta: { requiresAuth: true, roles: ['superadmin'] },
    },

    // 默认路由，重定向到登录页面
    {
        path: '/',
        redirect: '/login',
    },
    // 404 页面
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由守卫，检查用户认证和权限
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token'); // 假设 JWT Token 存储在 localStorage
    const role = localStorage.getItem('role'); // 假设用户角色存储在 localStorage

    if (to.meta.requiresAuth) {
        if (!token) {
            // 如果未登录，重定向到登录页面
            next({ path: '/login', query: { redirect: to.fullPath } });
        } else {
            // 检查用户角色是否有权限访问
            if (to.meta.roles.includes(role)) {
                next();
            } else {
                // 无权限，重定向到 404 页面或其他提示页面
                next({ path: '/not-found' });
            }
        }
    } else {
        next(); // 不需要认证，正常访问
    }
});

export default router;
