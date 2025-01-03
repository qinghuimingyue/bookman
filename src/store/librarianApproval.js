// src/store/librarianApproval.js

import {
    getAllBorrowApplications,
    approveBorrowApplication,
    rejectBorrowApplication
} from '@/api/librarianApproval.js';

const state = {
    borrowApplications: [],
    loading: false,
    error: null
};

const mutations = {
    SET_BORROW_APPLICATIONS(state, applications) {
        state.borrowApplications = applications;
    },
    SET_LOADING(state, status) {
        state.loading = status;
    },
    SET_ERROR(state, error) {
        state.error = error;
    }
};

const actions = {
    async fetchBorrowApplications({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getAllBorrowApplications();
            if (response.data.code === 200) {
                commit('SET_BORROW_APPLICATIONS', response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch borrow applications');
            }
        } catch (error) {
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async approveBorrow({ commit, dispatch }, { userId, bookId }) {
        commit('SET_LOADING', true);
        try {
            const response = await approveBorrowApplication(userId, bookId);
            if (response.data.code === 200) {
                // Optionally, you can show a success message
                dispatch('fetchBorrowApplications');
            } else {
                throw new Error(response.data.message || 'Failed to approve borrow application');
            }
        } catch (error) {
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async rejectBorrow({ commit, dispatch }, { userId, bookId }) {
        commit('SET_LOADING', true);
        try {
            const response = await rejectBorrowApplication(userId, bookId);
            if (response.data.code === 200) {
                // Optionally, you can show a success message
                dispatch('fetchBorrowApplications');
            } else {
                throw new Error(response.data.message || 'Failed to reject borrow application');
            }
        } catch (error) {
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    }
};

const getters = {
    allBorrowApplications: (state) => state.borrowApplications,
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
