<template>
    <div class="tagAdd">
        <p class="title">新建标签</p>
        <el-form :model="tagForm" :rules="rules" ref="tagFormRef" label-width="80px">
            <!-- 标签名称 -->
            <el-form-item label="标签名称" prop="name">
                <el-input v-model="tagForm.name" placeholder="请输入标签名称"></el-input>
            </el-form-item>

            <!-- 标签描述 -->
            <el-form-item label="标签描述" prop="description">
                <el-input v-model="tagForm.description" placeholder="请输入标签描述"></el-input>
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

const tagFormRef = ref(null);
// 定义表单内容
const tagForm = reactive({
    name: '',
    description: ''
});

// 设置表单验证规则


// 提交表单(手动验证表单)

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