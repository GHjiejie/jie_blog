<template>
    <el-upload class="upload" drag action="/api/blog" :auto-upload="false" :on-change="onChange">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>

    </el-upload>
</template>
<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { defineEmits } from 'vue';

const emits = defineEmits(['createBlog']);
const onChange = (file, fileList) => {
    // 通过自定义方法将内容传递给父组件
    emits('createBlog', file);
}


</script>
<style lang="scss" scoped>
.upload {
    width: 100%;
}
</style>