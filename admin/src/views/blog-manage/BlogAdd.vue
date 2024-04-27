<template>
    <div class="addblog">
        <div class="header"><span>创建一篇属于自己的文章吧</span></div>

        <el-form ref="blogFormRef" :model="blogForm" :rules="blogRules" status-icon :hide-required-asterisk="true">
            <!-- 博客标题 -->
            <el-form-item label="博客标题" prop="title">
                <el-input v-model="blogForm.title" placeholder="请输入博客标题"></el-input>
            </el-form-item>

            <!-- 博客类别 -->
            <el-form-item label="博客类别">
                <el-select v-model="blogForm.category" placeholder="请选择博客类别">
                    <el-option label="前端" value="前端"></el-option>
                    <el-option label="后端" value="后端"></el-option>
                    <el-option label="运维" value="运维"></el-option>
                    <el-option label="测试" value="测试"></el-option>
                    <el-option label="运维" value="运维"></el-option>
                    <el-option label="计算机组成原理" value="计算机组成原理"></el-option>
                    <el-option label="计算机网络" value="计算机网络"></el-option>
                    <el-option label="操作系统" value="操作系统"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                </el-select>
            </el-form-item>

            <!-- 博客标签 -->
            <el-form-item label="博客标签" required>
                <el-select v-model="blogForm.tag" placeholder="请选择博客标签">
                    <el-option :label="item.name" :value="item.name" v-for="(item, index) in tagList"></el-option>
                </el-select>
            </el-form-item>

            <!-- 博客作者 -->
            <el-form-item label="博客作者">
                <el-input v-model="blogForm.author" placeholder="请输入博客作者" style="width:20%"></el-input>
            </el-form-item>

            <input type="file" @change="handleFileChange" accept=".md" name="myFile">
            <div class="markdown-output" v-html="parsedMarkdown"></div>

            <el-form-item class="operate">
                <el-button type="primary" @click="submitForm">Submit</el-button>
                <el-button @click="resetForm">Reset</el-button>
            </el-form-item>
        </el-form>



    </div>
</template>

<script setup>

import { ref, reactive, onMounted } from 'vue';
import { marked } from '../../utils/marked'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import axios from 'axios';
import { ElMessage } from 'element-plus'

const tagList = ref([]);
const blogFormRef = ref(null);
let parsedMarkdown = ref('');

// 表单对象
const blogForm = reactive({
    title: '这个是测试数据',
    category: '',
    tag: '',
    author: 'Jie',
    content: '',
    published: new Date().toLocaleString(),
    year: new Date().getFullYear(),
    date: new Date().toLocaleDateString().substring(5),
});

// 表单项验证规则
const blogRules = reactive({
    title: [
        { required: true, message: '请输入博客标题', trigger: 'blur' },
        { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' },
    ],
    classification: [
        { required: true, message: '请选择博客类别', trigger: 'change' },
    ],
    tag: [
        { required: true, message: '请选择博客标签', trigger: 'change' },
    ],
});

// 页面初始化
onMounted(async () => {
    // 获取标签列表
    const res = await axios.get('/api/tag');
    tagList.value = res.data.data;
    console.log('tagList', tagList.value);
});


// 处理上传的文件，将其转换为markdown格式
const handleFileChange = (event) => {
    const file = event.target.files[0];
    blogForm.content = file;
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = document.querySelector('.markdown-output');
            // console.log(e);
            content.innerHTML = marked(e.target.result);
            blogForm.content = e.target.result;
            // 使代码高亮生效
            hljs.highlightAll();
        };
        reader.readAsText(file);
    }
};

// 手动验证表单(有文件上传)
// const submitForm = () => {
//     // console.log('显示提交数据', blogForm);
//     blogFormRef.value.validate(async (valid) => {
//         if (valid) {
//             // console.log('数据展示', blogForm);
//             // 将数据改为formData格式
//             const formData = new FormData();
//             for (let key in blogForm) {
//                 formData.append(key, blogForm[key]);
//             }
//             console.log('formData', formData);
//             // 经过验证没有错误后，再提交数据，这里可以使用axios发送ajax请求
//             const res = await axios({
//                 method: 'post',
//                 url: '/api/blog',
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 data: formData
//             });
//             console.log('res', res);
//             if (res.data.code === 200) {
//                 ElMessage({
//                     message: '博客添加成功',
//                     type: 'success',
//                     duration: 2000
//                 });
//                 // 重置表单
//                 resetForm();
//                 parsedMarkdown.value = '';
//             } else {
//                 ElMessage({
//                     message: '博客添加失败',
//                     type: 'error',
//                     duration: 2000
//                 });
//             }
//         } else {

//             console.log('error submit!!');
//             return false;
//         }
//     });
// }

// 手动验证表单(无文件)
const submitForm = () => {
    // console.log('显示提交数据', blogForm);
    blogFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log('数据展示', blogForm);
            // 经过验证没有错误后，再提交数据，这里可以使用axios发送ajax请求
            const res = await axios.post('/api/blog', blogForm);
            // console.log('res', res);
            if (res.data.code === 200) {
                ElMessage({
                    message: '博客添加成功',
                    type: 'success',
                    duration: 2000
                });
                // 重置表单
                resetForm();
                parsedMarkdown.value = '';
            } else {
                ElMessage({
                    message: '博客添加失败',
                    type: 'error',
                    duration: 2000
                });
            }
        } else {

            console.log('error submit!!');
            return false;
        }
    });
}


// 手动重置表单
const resetForm = () => {
    console.log('重置表单');
    // 为什么下拉菜单无法重置，需要手动重置？
    blogForm.classification = '';
    blogForm.tag = '';
    blogFormRef.value.resetFields();
}
</script>

<style scoped lang="scss">
.addblog {
    margin: 0 auto;

    .header {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        justify-content: center;
        padding: 1rem;
    }

    .el-form {
        .el-form-item {
            width: 90%;
            margin-bottom: 2rem;
        }

        .el-select {
            width: 50%;
        }
    }

    .markdown-output {
        box-sizing: border-box;
        width: 100%;
        margin: 1rem auto;
        font-family: Arial, sans-serif;
        // color: #000000;
        line-height: 2.5;
        padding: 0 2rem;
        // background-color: #f7f7f7;
        // border-radius: 2rem;
        // box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

        // 使用深度选择器修改样式(通常用于修改第三方组件的样式)
        :deep(pre) {
            background-color: rgba(0, 13, 255, 0.049);
            overflow: auto;
            font-weight: bold;

            code {
                background-color: rgba(0, 13, 255, 0.049);
                line-height: 2.5rem;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                // font-weight: bolder;
            }
        }
    }
}
</style>
