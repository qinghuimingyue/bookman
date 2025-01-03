// src/api/librarianApproval.js

import request from './request';

/**
 * 查询所有借出书籍申请
 * @returns {Promise} Axios Promise
 */
export const getAllBorrowApplications = () => {
    return request.get('/librarianApproval/allInfo');
};

/**
 * 通过用户借书申请
 * @param {string} userId - 用户唯一标识
 * @param {string} bookId - 书籍唯一标识
 * @returns {Promise} Axios Promise
 */
export const approveBorrowApplication = (userId, bookId) => {
    return request.get('/librarianApproval/pass', {
        params: { userId, bookId },
    });
};

/**
 * 拒绝用户借书申请
 * @param {string} userId - 用户唯一标识
 * @param {string} bookId - 书籍唯一标识
 * @returns {Promise} Axios Promise
 */
export const rejectBorrowApplication = (userId, bookId) => {
    return request.get('/librarianApproval/noPass', {
        params: { userId, bookId },
    });
};
