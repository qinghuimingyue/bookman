// src/store/superadmin.js

import {
    createLibrarian,
    getLibrarianList,
    deleteLibrarian,
    getAllBooks,
    getBookDetail,
    getBookBorrowHistory,
    getLibrarianApprovalList,
    approveLibrarianApproval,
    rejectLibrarianApproval
} from '@/api/superadmin';

const state = {
    librarianList: [],
    books: [],
    bookDetail: {},
    bookBorrowHistory: [],
    librarianApprovalList: [],
    loading: false,
    error: null,
};

const mutations = {
    SET_LIBRARIAN_LIST(state, list) {
        state.librarianList = list;
    },
    SET_BOOKS(state, books) {
        state.books = books;
    },
    SET_BOOK_DETAIL(state, detail) {
        state.bookDetail = detail;
    },
    SET_BOOK_BORROW_HISTORY(state, history) {
        state.bookBorrowHistory = history;
    },
    SET_LIBRARIAN_APPROVAL_LIST(state, list) {
        state.librarianApprovalList = list;
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
     * 创建图书管理员
     * @param {Object} payload - 包含 userId, userName, gender, birthday
     */
    async createLibrarianAction({ commit }, payload) {
        commit('SET_LOADING', true);
        try {
            const response = await createLibrarian(payload);
            if (response.data.code === 200) {
                this.dispatch('superadmin/fetchLibrarianList');
                return response.data;
            } else {
                throw new Error(response.data.message || '创建图书管理员失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('创建图书管理员失败:', error);
            throw error;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 获取所有图书管理员信息
     */
    async fetchLibrarianList({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getLibrarianList();
            if (response.data.code === 200) {
                commit('SET_LIBRARIAN_LIST', response.data.data);
            } else {
                throw new Error(response.data.message || '获取图书管理员列表失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取图书管理员列表失败:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 删除图书管理员
     * @param {string} userId
     */
    async deleteLibrarianAction({ commit }, userId) {
        try {
            const response = await deleteLibrarian(userId);
            if (response.data.code === 200) {
                this.dispatch('superadmin/fetchLibrarianList');
                return response.data;
            } else {
                throw new Error(response.data.message || '删除图书管理员失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('删除图书管理员失败:', error);
            throw error;
        }
    },

    /**
     * 获取所有书籍信息
     */
    async fetchAllBooks({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getAllBooks();
            if (response.data.code === 200) {
                commit('SET_BOOKS', response.data.data);
            } else {
                throw new Error(response.data.message || '获取书籍列表失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取书籍列表失败:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 获取书籍详情
     * @param {string} bookId
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
     * @param {string} bookId
     */
    async fetchBookBorrowHistory({ commit }, bookId) {
        commit('SET_LOADING', true);
        try {
            const response = await getBookBorrowHistory(bookId);
            if (response.data.code === 200) {
                commit('SET_BOOK_BORROW_HISTORY', response.data.data);
            } else {
                throw new Error(response.data.message || '获取书籍借阅历史失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取书籍借阅历史失败:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 获取图书管理员信息修改申请列表
     */
    async fetchLibrarianApprovalList({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getLibrarianApprovalList();
            if (response.data.code === 200) {
                commit('SET_LIBRARIAN_APPROVAL_LIST', response.data.data);
            } else {
                throw new Error(response.data.message || '获取审批列表失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取审批列表失败:', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 批准图书管理员信息修改申请
     * @param {string} userId
     */
    async approveLibrarianApprovalAction({ commit, dispatch }, userId) {
        try {
            const response = await approveLibrarianApproval(userId);
            if (response.data.code === 200) {
                dispatch('fetchLibrarianApprovalList');
                return response.data;
            } else {
                throw new Error(response.data.message || '批准申请失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('批准申请失败:', error);
            throw error;
        }
    },

    /**
     * 拒绝图书管理员信息修改申请
     * @param {string} userId
     */
    async rejectLibrarianApprovalAction({ commit, dispatch }, userId) {
        try {
            const response = await rejectLibrarianApproval(userId);
            if (response.data.code === 200) {
                dispatch('fetchLibrarianApprovalList');
                return response.data;
            } else {
                throw new Error(response.data.message || '拒绝申请失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('拒绝申请失败:', error);
            throw error;
        }
    },
};

const getters = {
    librarianList: (state) => state.librarianList,
    books: (state) => state.books,
    bookDetail: (state) => state.bookDetail,
    bookBorrowHistory: (state) => state.bookBorrowHistory,
    librarianApprovalList: (state) => state.librarianApprovalList,
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
