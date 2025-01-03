// src/store/book.js

import {
    getAllBookInfor,
    getBookDetail,
    getUserBorrowingInfo
} from '@/api/book.js';

const state = {
    books: [],
    selectedBook: {},
    borrowingInfo: [],
    loading: false,
    error: null
};

const mutations = {
    SET_BOOKS(state, books) {
        state.books = books;
    },
    SET_SELECTED_BOOK(state, book) {
        state.selectedBook = book;
    },
    SET_BORROWING_INFO(state, info) {
        state.borrowingInfo = info;
    },
    SET_LOADING(state, status) {
        state.loading = status;
    },
    SET_ERROR(state, error) {
        state.error = error;
    }
};

const actions = {
    async fetchAllBooks({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getAllBookInfor();
            if (response.data.code === 200) {
                commit('SET_BOOKS', response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch books');
            }
        } catch (error) {
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchBookDetail({ commit }, bookId) {
        commit('SET_LOADING', true);
        try {
            const response = await getBookDetail(bookId);
            if (response.data.code === 200) {
                commit('SET_SELECTED_BOOK', response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch book detail');
            }
        } catch (error) {
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchBorrowingInfo({ commit }, bookId) {
        commit('SET_LOADING', true);
        try {
            const response = await getUserBorrowingInfo(bookId);
            if (response.data.code === 200) {
                commit('SET_BORROWING_INFO', response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch borrowing info');
            }
        } catch (error) {
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    }
};

const getters = {
    allBooks: (state) => state.books,
    selectedBook: (state) => state.selectedBook,
    borrowingInfo: (state) => state.borrowingInfo,
    isLoading: (state) => state.loading,
    error: (state) => state.error
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
