// src/store/admin.js

import {
    getAllBorrowRequests,
    approveBorrowRequest,
    rejectBorrowRequest,
    getAllReturnRequests,
    approveReturnRequest,
    rejectReturnRequest,
    getAdminInfo,
    getAllBooks,
    getBookDetail,
    getBookBorrowingHistory
} from '@/api/admin';

const state = {
    adminInfo: {},
    borrowRequests: [],
    returnRequests: [],
    books: [],
    bookDetail: {},
    borrowingHistory: [],
    loading: false,
    error: null,
};

const mutations = {
    SET_ADMIN_INFO(state, info) {
        state.adminInfo = info;
    },
    SET_BORROW_REQUESTS(state, requests) {
        state.borrowRequests = requests;
    },
    SET_RETURN_REQUESTS(state, requests) {
        state.returnRequests = requests;
    },
    SET_BOOKS(state, books) {
        state.books = books;
    },
    SET_BOOK_DETAIL(state, detail) {
        state.bookDetail = detail;
    },
    SET_BORROWING_HISTORY(state, history) {
        state.borrowingHistory = history;
    },
    SET_LOADING(state, status) {
        state.loading = status;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
};

const actions = {
    /**
     * 获取图书管理员个人信息
     */
    async fetchAdminInfo({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getAdminInfo();
            if (response.data.code === 200) {
                commit('SET_ADMIN_INFO', response.data.data);
            } else {
                throw new Error(response.data.message || '获取个人信息失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取个人信息失败:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 获取所有借出书籍申请
     */
    async fetchBorrowRequests({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getAllBorrowRequests();
            if (response.data.code === 200) {
                commit('SET_BORROW_REQUESTS', response.data.data);
            } else {
                throw new Error(response.data.message || '获取借出书籍申请失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取借出书籍申请失败:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 批准用户借书申请
     * @param {Object} payload - 包含 userId 和 bookId
     */
    async approveBorrow({ commit, dispatch }, { userId, bookId }) {
        try {
            const response = await approveBorrowRequest(userId, bookId);
            if (response.data.code === 200) {
                dispatch('fetchBorrowRequests');
                return response.data;
            } else {
                throw new Error(response.data.message || '批准借书申请失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('批准借书申请失败:', error);
            throw error;
        }
    },

    /**
     * 拒绝用户借书申请
     * @param {Object} payload - 包含 userId 和 bookId
     */
    async rejectBorrow({ commit, dispatch }, { userId, bookId }) {
        try {
            const response = await rejectBorrowRequest(userId, bookId);
            if (response.data.code === 200) {
                dispatch('fetchBorrowRequests');
                return response.data;
            } else {
                throw new Error(response.data.message || '拒绝借书申请失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('拒绝借书申请失败:', error);
            throw error;
        }
    },

    /**
     * 获取所有归还书籍申请
     */
    async fetchReturnRequests({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getAllReturnRequests();
            if (response.data.code === 200) {
                commit('SET_RETURN_REQUESTS', response.data.data);
            } else {
                throw new Error(response.data.message || '获取归还书籍申请失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取归还书籍申请失败:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 批准用户还书申请
     * @param {Object} payload - 包含 userId 和 bookId
     */
    async approveReturn({ commit, dispatch }, { userId, bookId }) {
        try {
            const response = await approveReturnRequest(userId, bookId);
            if (response.data.code === 200) {
                dispatch('fetchReturnRequests');
                return response.data;
            } else {
                throw new Error(response.data.message || '批准还书申请失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('批准还书申请失败:', error);
            throw error;
        }
    },

    /**
     * 拒绝用户还书申请
     * @param {Object} payload - 包含 userId 和 bookId
     */
    async rejectReturn({ commit, dispatch }, { userId, bookId }) {
        try {
            const response = await rejectReturnRequest(userId, bookId);
            if (response.data.code === 200) {
                dispatch('fetchReturnRequests');
                return response.data;
            } else {
                throw new Error(response.data.message || '拒绝还书申请失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('拒绝还书申请失败:', error);
            throw error;
        }
    },

    /**
     * 获取所有书籍概览信息
     */
    async fetchAllBooks({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getAllBooks();
            if (response.data.code === 200) {
                commit('SET_BOOKS', response.data.data);
            } else {
                throw new Error(response.data.message || '获取书籍概览信息失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取书籍概览信息失败:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 获取书籍详情
     * @param {string} bookId - 书籍唯一标识
     */
    async fetchBookDetail({ commit }, bookId) {
        commit('SET_LOADING', true);
        try {
            const response = await getBookDetail(bookId);
            if (response.data.code === 200) {
                commit('SET_BOOK_DETAIL', response.data.data);
            } else {
                throw new Error(response.data.message || '获取书籍详情失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取书籍详情失败:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 获取书籍过往借阅详情
     * @param {string} bookId - 书籍唯一标识
     */
    async fetchBorrowingHistory({ commit }, bookId) {
        commit('SET_LOADING', true);
        try {
            const response = await getBookBorrowingHistory(bookId);
            if (response.data.code === 200) {
                commit('SET_BORROWING_HISTORY', response.data.data);
            } else {
                throw new Error(response.data.message || '获取借阅历史失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取借阅历史失败:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },
};

const getters = {
    adminInfo: (state) => state.adminInfo,
    borrowRequests: (state) => state.borrowRequests,
    returnRequests: (state) => state.returnRequests,
    books: (state) => state.books,
    bookDetail: (state) => state.bookDetail,
    borrowingHistory: (state) => state.borrowingHistory,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
