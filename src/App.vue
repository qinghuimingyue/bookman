<!-- src/App.vue -->

<template>
    <div id="app">
        <!-- 仅在用户已登录时显示 AppHeader -->
        <AppHeader v-if="isAuthenticated" />

        <!-- 渲染当前路由对应的页面 -->
        <router-view />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from '@/components/AppHeader.vue';

export default {
    name: 'App',
    components: {
        AppHeader,
    },
    computed: {
        ...mapGetters('user', ['isAuthenticated']),
    },
};
</script>

<style>
/* 全局样式 */
body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f0f2f5;
}
</style>
