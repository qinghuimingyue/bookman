<!-- src/pages/User/BorrowBook.vue -->

<template>
    <div class="borrow-book">
        <h2>提交借书申请</h2>
        <el-form :model="formData" :rules="rules" ref="borrowForm" label-width="120px">
            <el-form-item label="书籍" prop="bookId">
                <el-select v-model="formData.bookId" placeholder="请选择书籍">
                    <el-option
                        v-for="book in availableBooks"
                        :key="book.bookId"
                        :label="book.bookName"
                        :value="book.bookId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预计还书时间" prop="estimatedReturnDate">
                <el-date-picker
                    v-model="formData.estimatedReturnDate"
                    type="date"
                    placeholder="选择预计还书时间"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
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
    name: 'BorrowBook',
    data() {
        return {
            formData: {
                bookId: '',
                estimatedReturnDate: '',
            },
            rules: {
                bookId: [
                    { required: true, message: '请选择书籍', trigger: 'change' },
                ],
                estimatedReturnDate: [
                    { required: true, message: '请选择预计还书时间', trigger: 'change' },
                ],
            },
        };
    },
    computed: {
        ...mapGetters('user', ['books', 'isLoading', 'error']),
        availableBooks() {
            return this.books.filter(book => book.status === '在馆');
        },
    },
    methods: {
        ...mapActions('user', ['fetchAllBooks', 'submitBorrowAction']),
        async onSubmit() {
            this.$refs.borrowForm.validate(async (valid) => {
                if (valid) {
                    try {
                        const response = await this.submitBorrowAction(this.formData);
                        this.$message.success(response.message);
                        this.onReset();
                    } catch (error) {
                        this.$message.error(error.message || '提交借书申请失败');
                    }
                } else {
                    this.$message.error('请填写完整信息');
                }
            });
        },
        onReset() {
            this.formData = {
                bookId: '',
                estimatedReturnDate: '',
            };
            this.$refs.borrowForm.resetFields();
        },
    },
    mounted() {
        this.fetchAllBooks();
    },
};
</script>

<style scoped>
@import '@/assets/styles/user.css';

.borrow-book {
    padding: 20px;
    background-color: #fff;
    min-height: 100vh;
}

.borrow-book h2 {
    margin-bottom: 20px;
    color: #333;
}

.borrow-book .el-form {
    max-width: 600px;
    margin: 0 auto;
}
</style>
