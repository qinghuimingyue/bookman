// src/store/librarianReturn.js

import {
    getAllReturnApplications,
    approveReturnApplication,
    rejectReturnApplication
} from '@/api/librarianReturn.js';

const state = {
    returnApplications: [],
    loading: false,
    error: null
};

const mutations = {
    SET_RETURN_APPLICATIONS(state, applications) {
        state.returnApplications = applications;
    },
    SET_LOADING(state, status) {
        state.loading = status;
    },
    SET_ERROR(state, error) {
        state.error = error;
    }
};

const actions = {
    async fetchReturnApplications({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getAllReturnApplications();
            if (response.data.code === 200) {
                commit('SET_RETURN_APPLICATIONS', response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch return applications');
            }
        } catch (error) {
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async approveReturn({ commit, dispatch }, { userId, bookId }) {
        commit('SET_LOADING', true);
        try {
            const response = await approveReturnApplication(userId, bookId);
            if (response.data.code === 200) {
                // Optionally, you can show a success message
                dispatch('fetchReturnApplications');
            } else {
                throw new Error(response.data.message || 'Failed to approve return application');
            }
        } catch (error) {
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async rejectReturn({ commit, dispatch }, { userId, bookId }) {
        commit('SET_LOADING', true);
        try {
            const response = await rejectReturnApplication(userId, bookId);
            if (response.data.code === 200) {
                // Optionally, you can show a success message
                dispatch('fetchReturnApplications');
            } else {
                throw new Error(response.data.message || 'Failed to reject return application');
            }
        } catch (error) {
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    }
};

const getters = {
    allReturnApplications: (state) => state.returnApplications,
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
