// 检查是否为普通用户
export const checkAuth = (role) => {
    const userRole = localStorage.getItem('role');
    return userRole && userRole === role;
};

// 检查是否为管理员
export const checkAdminAuth = () => {
    const userRole = localStorage.getItem('role');
    return userRole && userRole === 'admin';
};

// 检查是否为超级管理员
export const checkSuperAdminAuth = () => {
    const userRole = localStorage.getItem('role');
    return userRole && userRole === 'superadmin';
};

// 获取 JWT Token
/**
 * 获取 JWT Token
 * @returns {string|null} Token 字符串或 null
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

// 设置 JWT Token
/**
 * 设置 JWT Token
 * @param {string} token - Token 字符串
 */
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

// 清除 JWT Token
/**
 * 清除 JWT Token
 */
export const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};
