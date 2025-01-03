// src/api/superadmin.js

import request from './request';

/**
 * 创建图书管理员信息
 * @param {Object} data - 包含 userId, userName, gender, birthday
 * @returns {Promise} Axios Promise
 */
export const createLibrarian = (data) => {
    return request.post('/creatLibrarian', data);
};

/**
 * 获取所有图书管理员信息
 * @returns {Promise} Axios Promise
 */
export const getLibrarianList = () => {
    return request.get('/listLibrarian');
};

/**
 * 删除图书管理员
 * @param {string} userId - 图书管理员唯一标识
 * @returns {Promise} Axios Promise
 */
export const deleteLibrarian = (userId) => {
    return request.get('/deleteEMP', { params: { userId } });
};

/**
 * 获取书籍概览信息
 * @returns {Promise} Axios Promise
 */
export const getAllBooks = () => {
    return request.get('/book/allBookInfor');
};

/**
 * 获取书籍详情
 * @param {string} bookId - 书籍唯一标识
 * @returns {Promise} Axios Promise
 */
export const getBookDetail = (bookId) => {
    return request.get('/book/bookDetail', { params: { bookId } });
};

/**
 * 获取书籍过往借阅详情
 * @param {string} bookId - 书籍唯一标识
 * @returns {Promise} Axios Promise
 */
export const getBookBorrowHistory = (bookId) => {
    return request.get('/book/userBorrowingInfo', { params: { bookId } });
};

/**
 * 获取图书管理员信息修改申请列表
 * @returns {Promise} Axios Promise
 */
export const getLibrarianApprovalList = () => {
    return request.get('/librarianInfoApproval/approvalList');
};

/**
 * 批准图书管理员信息修改申请
 * @param {string} userId - 图书管理员唯一标识
 * @returns {Promise} Axios Promise
 */
export const approveLibrarianApproval = (userId) => {
    return request.get('/librarianInfoApproval/approved', { params: { userId } });
};

/**
 * 拒绝图书管理员信息修改申请
 * @param {string} userId - 图书管理员唯一标识
 * @returns {Promise} Axios Promise
 */
export const rejectLibrarianApproval = (userId) => {
    return request.post('/librarianInfoApproval/unPass', { userId });
};
