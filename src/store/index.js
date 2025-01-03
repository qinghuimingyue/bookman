// src/store/index.js

import { createStore } from 'vuex';
import user from './user';
import admin from './admin';
import superadmin from './superadmin';
// 导入其他模块...

export default createStore({
    modules: {
        user,
        admin,
        superadmin,
        // 其他模块...
    },
});
