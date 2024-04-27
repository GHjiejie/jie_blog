

<template>
    <div class="login">
        <video autoplay muted loop>
            <source src="../assets/mp4/pexels-kammeran-gonzalezkeola-17838377 (1440p).mp4" type="video/mp4">
        </video>
        <el-form ref="LoginruleFormRef" :model="loginForm" status-icon :rules="rules" label-width="120px"
            label-position="top" class="loginForm">
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" type="username" placeholder="用户名" />
            </el-form-item>

            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="密码" />
            </el-form-item>
            <el-form-item>
                <el-button class="submit" type="primary" @click="submitForm(LoginruleFormRef)"><span>登录</span></el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import router from '../router/index.js';
import axios from 'axios';
import { ElMessage } from 'element-plus'

// 定义表单的引用
const LoginruleFormRef = ref(null);

// 定义登录时需要的数据
const loginForm = reactive({
    username: 'admin',
    password: '12345'
});


// 手动校验表单
const submitForm = (LoginruleFormRef) => {
    // console.log(LoginruleFormRef);
    // 下面代码的内容使用了element-plus的表单验证里面的内置方法validate
    LoginruleFormRef.validate(async (valid) => {
        // 如果表单验证通过
        if (valid) {
            const res = await axios({
                method: 'post',
                url: '/api/user/loginCheck',
                data: {
                    username: loginForm.username,
                    password: loginForm.password
                }
            });
            if (res.data.code === 200) {
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                    duration: 500
                });
                // console.log('在登录模块里面输出身份信息');
                // console.log(res.headers.authorization);
                router.push('/mainbox');
            } else {
                ElMessage({
                    message: '用户名或密码错误',
                    type: 'error',
                    duration: 1000
                });
            }
            // 获取表单数据，然后发送请求
        } else {
            console.log('error submit!!');
            return false;
        }
    });
};



// 定义登录时需要的方法
// 1.验证用户名
const validateUsername = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入用户名'));
    }
    const lengthValue = value.length >= 3 && value.length <= 20;
    const formatValid = /^[a-zA-Z0-9]+$/.test(value);
    if (!lengthValue) {
        return callback(new Error('用户名长度为3-20位'));
    }
    if (!formatValid) {
        return callback(new Error('用户名只能包含数字和字母'));
    }
    callback();
};

// 2.验证密码
const validatePassword = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入密码'));
    }
    callback();
};

// 定义验证的规则
const rules = {
    username: [{ validator: validateUsername, trigger: 'change' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
};

</script>

<style lang="scss" scoped>
.login {
    position: relative;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;

    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        z-index: -1;
    }



    .loginForm {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 20px;
        background-color: rgba(232, 221, 221, 0.147);
        box-shadow: 0 0 10px 0 rgba(231, 222, 222, 0.771);
        border-radius: 2rem;
        z-index: 666;


        .submit {

            width: 100%;
            background-color: deepskyblue;

        }
    }
}
</style>