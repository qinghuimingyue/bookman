<!-- src/pages/User/ReturnBook.vue -->

<template>
    <div class="return-book">
        <h2>提交还书申请</h2>
        <el-form :model="formData" :rules="rules" ref="returnForm" label-width="120px">
            <el-form-item label="书籍" prop="bookId">
                <el-select v-model="formData.bookId" placeholder="请选择书籍">
                    <el-option
                            v-for="book in borrowedBooks"
                            :key="book.bookId"
                            :label="book.bookName"
                            :value="book.bookId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="isLoading">提交申请</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
            <el-alert v-if="error" :title="error" type="error" show-icon></el-alert>
        </el-form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ReturnBook',
    data() {
        return {
            formData: {
                bookId: '',
            },
            rules: {
                bookId: [
                    { required: true, message: '请选择书籍', trigger: 'change' },
                ],
            },
        };
    },
    computed: {
        ...mapGetters('user', ['userInfo', 'isLoading', 'error']),
        borrowedBooks() {
            return this.userInfo.borrowingInfoList || [];
        },
    },
    methods: {
        ...mapActions('user', ['submitReturnAction']),
        async onSubmit() {
            this.$refs.returnForm.validate(async (valid) => {
                if (valid) {
                    try {
                        const response = await this.submitReturnAction(this.formData.bookId);
                        this.$message.success(response.message);
                        this.onReset();
                    } catch (error) {
                        this.$message.error(error.message || '提交还书申请失败');
                    }
                } else {
                    this.$message.error('请填写完整信息');
                }
            });
        },
        onReset() {
            this.formData = {
                bookId: '',
            };
            this.$refs.returnForm.resetFields();
        },
    },
};
</script>

<style scoped>
@import '@/assets/styles/user.css';

.return-book {
    padding: 20px;
    background-color: #fff;
    min-height: 100vh;
}

.return-book h2 {
    margin-bottom: 20px;
    color: #333;
}

.return-book .el-form {
    max-width: 600px;
    margin: 0 auto;
}
</style>
