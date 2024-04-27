<template>
    <div class="tagAdd">
        <p class="title">新建标签</p>
        <el-form :model="tagForm" :rules="rules" ref="tagFormRef" label-width="80px" :hide-required-asterisk="true">
            <!-- 标签名称 -->
            <el-form-item label="标签名称" prop="name">
                <el-input v-model="tagForm.name" placeholder="请输入标签名称"></el-input>
            </el-form-item>

            <!-- 标签描述 -->
            <el-form-item label="标签描述" prop="description">
                <el-input v-model="tagForm.description" placeholder="请输入标签描述" type="textarea"></el-input>
            </el-form-item>

            <el-form-item class="operate">
                <el-button type="primary" @click="submitForm">Submit</el-button>
                <el-button @click="resetForm">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>

import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'


const tagFormRef = ref(null);
// 定义表单内容
const tagForm = reactive({
    name: '',
    description: ''
});

// 标签验证
const validateTagName = async (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入标签名称'));
    } else {
        const res = await axios.get('/api/tag/vaildate', { params: { name: value } });

        if (res.data.code === 200) {
            callback(new Error('标签名称已存在'));
        } else {
            callback();
        }
    }
};
// 设置表单验证规则
const rules = reactive({
    name: [{ validator: validateTagName, trigger: 'blur' }],
    description: [
        { required: true, message: '请输入标签描述', trigger: 'blur' },
        { min: 2, max: 100, message: '长度在 5 到 100个字符', trigger: 'blur' }
    ]
});


// 提交表单(手动验证表单)
const submitForm = () => {
    tagFormRef.value.validate(async (valid) => {
        if (valid) {
            await axios.post('/api/tag', tagForm);
            ElMessage({
                type: 'success',
                message: '提交成功'
            });
        } else {
            ElMessage({
                type: 'error',
                message: '提交失败'
            });
            return false;
        }
    });
};

// 重置表单
const resetForm = () => {
    tagFormRef.value.resetFields();
};

</script>
<style lang="scss" scoped>
.tagAdd {
    .title {
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 20px;
    }


}
</style>