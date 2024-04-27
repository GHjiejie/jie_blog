<template>
    <div class="feedback">
        <h1>收到反馈</h1>
    </div>
    <div class="feedbackList" v-for=" item in  feedbackList" :key="item._id">
        <div class="name">反馈用户：{{ item.name }}</div>
        <div class="time">反馈时间：{{ item.time }}</div>
        <div class="email">用户邮箱:{{ item.email }}</div>
        <div class="content">反馈内容：{{ item.feedback }}</div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';

const feedbackList = ref({});

// 获取反馈列表
onMounted(async () => {
    const res = await axios.get('/api/contact');
    if (res.data.code === 200) {
        ElMessage({
            message: '获取反馈列表成功',
            type: 'success',
            time: 500,
        })
        // console.log(res);
        feedbackList.value = res.data.data;
        // console.log(feedbackList.value);
    } else {
        ElMessage.error('获取反馈列表失败');
    }
});
</script> 


<style scoped lang="scss">
.feedback {
    text-align: center;
    margin-top: 20px;
}

.feedback h1 {
    color: #3498db;
    /* Blue color for the heading */
}

.feedbackList {
    border: 2px solid #3498db;
    /* Border color */
    border-radius: 0.8rem;
    /* Rounded corners */
    padding: 1rem;
    margin-top: 20px;
    background-color: #fff;
    /* White background */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    /* Box shadow for depth */
}

.name,
.time,
.email,
.content {
    margin-bottom: 1rem;
}

.name {
    font-weight: bold;
    color: #2c3e50;
    /* Dark gray color for the name */
}

.time {
    color: #7f8c8d;
    /* Light gray color for the time */
    font-style: italic;
    font-size: 0.8rem;
}

.email {
    color: #7f8c8d;
    font-size: 0.8rem;
    /* Light gray color for the email */
}

.content {
    color: #333;
    /* Dark text color for content */
}

/* Provide some spacing between feedback items */
.feedbackList+.feedbackList {
    margin-top: 15px;
}
</style>
