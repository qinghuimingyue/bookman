// src/store/user.js

import {
    login,
    getUserInfo,
    collectBook,
    undoCollectBook,
    getAllCollectInfo,
    submitBorrowApplication,
    submitReturnApplication,
    updateUserInfo
} from '@/api/user';
import { ElMessage } from 'element-plus';

const state = {
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
    userInfo: {},
    collectList: [],
    loading: false,
    error: null,
};

const getters = {
    isAuthenticated: (state) => !!state.token,
    token: (state) => state.token,
    role: (state) => state.role,
    username: (state) => state.userInfo.userName || '',
    userInfo: (state) => state.userInfo,
    collectList: (state) => state.collectList,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
    },
    SET_ROLE(state, role) {
        state.role = role;
        localStorage.setItem('role', role);
    },
    CLEAR_AUTH(state) {
        state.token = '';
        state.role = '';
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    },
    SET_USER_INFO(state, info) {
        state.userInfo = info;
    },
    SET_COLLECT_LIST(state, list) {
        state.collectList = list;
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
     * 用户登录
     * @param {Object} payload - 包含 userId, password, type
     */
    async loginAction({ commit }, { userId, password, type }) {
        commit('SET_LOADING', true);
        try {
            const response = await login(userId, password, type);
            if (response.code === 200) {
                commit('SET_TOKEN', response.token);
                commit('SET_ROLE', response.role);
                // 获取用户信息
                const userInfoResponse = await getUserInfo();
                if (userInfoResponse.code === 200) {
                    commit('SET_USER_INFO', userInfoResponse.data);
                } else {
                    throw new Error(userInfoResponse.message || '获取用户信息失败');
                }
                ElMessage.success('登录成功');
            } else {
                ElMessage.error(response.message || '登录失败');
                throw new Error(response.message || '登录失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('登录失败:', error);
            ElMessage.error(error.message || '登录失败');
            throw error;
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 用户登出
     */
    logout({ commit }) {
        commit('CLEAR_AUTH');
        ElMessage.success('登出成功');
    },

    /**
     * 获取用户信息
     */
    async fetchUserInfo({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getUserInfo();
            if (response.code === 200) {
                commit('SET_USER_INFO', response.data);
            } else {
                throw new Error(response.message || '获取用户信息失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取用户信息失败:', error);
            ElMessage.error(error.message || '获取用户信息失败');
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 收藏书籍
     * @param {string} bookId
     */
    async collectBookAction({ dispatch, commit }, bookId) {
        try {
            const response = await collectBook(bookId);
            if (response.code === 200) {
                dispatch('fetchAllCollectInfo');
                ElMessage.success(response.data);
                return response;
            } else {
                throw new Error(response.message || '收藏失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('收藏失败:', error);
            ElMessage.error(error.message || '收藏失败');
            throw error;
        }
    },

    /**
     * 取消收藏书籍
     * @param {string} bookId
     */
    async undoCollectBookAction({ dispatch, commit }, bookId) {
        try {
            const response = await undoCollectBook(bookId);
            if (response.code === 200) {
                dispatch('fetchAllCollectInfo');
                ElMessage.success(response.data);
                return response;
            } else {
                throw new Error(response.message || '取消收藏失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('取消收藏失败:', error);
            ElMessage.error(error.message || '取消收藏失败');
            throw error;
        }
    },

    /**
     * 获取所有收藏信息
     */
    async fetchAllCollectInfo({ commit }) {
        commit('SET_LOADING', true);
        try {
            const response = await getAllCollectInfo();
            if (response.code === 200) {
                commit('SET_COLLECT_LIST', response.data);
            } else {
                throw new Error(response.message || '获取收藏信息失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('获取收藏信息失败:', error);
            ElMessage.error(error.message || '获取收藏信息失败');
        } finally {
            commit('SET_LOADING', false);
        }
    },

    /**
     * 提交借出书籍申请
     * @param {Object} payload - 包含 bookId 和 estimatedReturnDate
     */
    async submitBorrowAction({ commit }, { bookId, estimatedReturnDate }) {
        try {
            const response = await submitBorrowApplication(bookId, estimatedReturnDate);
            if (response.code === 200) {
                ElMessage.success(response.data);
                return response;
            } else {
                throw new Error(response.message || '提交借书申请失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('提交借书申请失败:', error);
            ElMessage.error(error.message || '提交借书申请失败');
            throw error;
        }
    },

    /**
     * 提交归还书籍申请
     * @param {string} bookId
     */
    async submitReturnAction({ commit }, bookId) {
        try {
            const response = await submitReturnApplication(bookId);
            if (response.code === 200) {
                ElMessage.success(response.data);
                return response;
            } else {
                throw new Error(response.message || '提交还书申请失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('提交还书申请失败:', error);
            ElMessage.error(error.message || '提交还书申请失败');
            throw error;
        }
    },

    /**
     * 用户信息修改
     * @param {Object} data - 包含 userId, userName, gender, birthday
     */
    async updateUserInfoAction({ commit, dispatch }, data) {
        commit('SET_LOADING', true);
        try {
            const response = await updateUserInfo(data);
            if (response.code === 200) {
                // 重新获取用户信息
                await dispatch('fetchUserInfo');
                ElMessage.success(response.data);
                return response;
            } else {
                throw new Error(response.message || '更新信息失败');
            }
        } catch (error) {
            commit('SET_ERROR', error.message);
            console.error('更新信息失败:', error);
            ElMessage.error(error.message || '更新信息失败');
            throw error;
        } finally {
            commit('SET_LOADING', false);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
