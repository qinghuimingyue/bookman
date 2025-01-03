<!-- src/pages/SuperAdmin/CreateLibrarian.vue -->

<template>
    <div class="create-librarian">
        <h2>创建图书管理员账号</h2>

        <el-form
                :model="formData"
                :rules="rules"
                ref="createForm"
                label-width="120px"
                class="form-container">

            <el-form-item label="用户ID" prop="userId">
                <el-input v-model="formData.userId" placeholder="请输入用户ID"></el-input>
            </el-form-item>

            <el-form-item label="用户名" prop="userName">
                <el-input v-model="formData.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input
                        v-model="formData.password"
                        type="password"
                        placeholder="请输入密码">
                </el-input>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="formData.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="出生日期" prop="birthday">
                <el-date-picker
                        v-model="formData.birthday"
                        type="date"
                        placeholder="选择出生日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">创建</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { superadminApi } from '@/api';

export default {
    name: 'CreateLibrarian',
    data() {
        return {
            formData: {
                userId: '',
                userName: '',
                password: '',
                gender: '',
                birthday: '',
            },
            rules: {
                userId: [
                    { required: true, message: '请输入用户ID', trigger: 'blur' },
                ],
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '密码长度至少6位', trigger: 'blur' },
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' },
                ],
                birthday: [
                    { required: true, message: '请选择出生日期', trigger: 'change' },
                ],
            },
        };
    },
    methods: {
        onSubmit() {
            this.$refs.createForm.validate(async (valid) => {
                if (valid) {
                    try {
                        const response = await superadminApi.createLibrarian({
                            userId: this.formData.userId,
                            userName: this.formData.userName,
                            password: this.formData.password,
                            gender: this.formData.gender,
                            birthday: this.formData.birthday,
                        });
                        if (response.code === 200) {
                            this.$message.success('创建成功');
                            this.onReset();
                            // 可能需要刷新管理员列表
                        } else {
                            this.$message.error(response.message || '创建失败');
                        }
                    } catch (error) {
                        this.$message.error(error.message || '创建失败');
                        console.error('创建失败:', error);
                    }
                } else {
                    this.$message.error('请填写完整信息');
                    return false;
                }
            });
        },
        onReset() {
            this.$refs.createForm.resetFields();
        },
    },
};
</script>

<style scoped>
.create-librarian {
    padding: 20px;
    background-color: #fff;
    min-height: 100vh;
}

.create-librarian h2 {
    margin-bottom: 20px;
    color: #333;
}

.form-container {
    max-width: 600px;
}
</style>
