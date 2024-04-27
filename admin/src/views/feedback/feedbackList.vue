<template>
    <div class="feedback">
        <div class="title">用户反馈</div>

        <el-table :data="feedbackList" style="width: 100%">
            <el-table-column type="expand">
                <template #default="props">
                    <div class="feedbackContent">
                        <div class="email"><span>反馈用户邮箱:</span>
                            <p> {{ props.row.email }}</p>
                        </div>
                        <div class="content"><span>反馈内容:</span>
                            <p>{{ props.row.feedback }}</p>
                        </div>

                    </div>
                </template>
            </el-table-column>
            <el-table-column label="反馈时间" prop="time" class="time" />
            <el-table-column label="反馈用户姓名" prop="name" />
            <el-table-column label="操作">

                <template #default="scope">
                    <el-button type="danger" link size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

const feedbackList = ref([]);

// 删除用户的反馈
const handleDelete = async (currentRowDate) => {
    ElMessageBox.confirm(
        '删除后不可恢复，请谨慎操作！',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            const res = await axios.delete(`/api/contact/${currentRowDate._id}`);
            if (res.data.code === 200) {
                feedbackList.value = feedbackList.value.filter(item => item._id !== currentRowDate._id);
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
            } else {
                ElMessage({
                    type: 'error',
                    message: '删除失败',
                })
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除',
            })
        })

}

// 页面初始化
onMounted(async () => {
    const res = await axios.get('/api/contact');
    if (res.data.code === 200) {
        feedbackList.value = res.data.data;
    } else {
        ElMessage.error('获取反馈列表失败');
    }
});

</script> 
<style lang="scss" scoped>
.el-table {
    .cell {
        padding: 0.5rem;
        color: red;
    }
}

.feedback {

    .title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
    }

}

.feedbackContent {
    box-sizing: border-box;
    padding: 0.5rem;

    .email {
        margin: 0.5rem 0;
    }

    span {
        font-weight: bold;
        color: black;
    }

    p {
        padding: 0.5rem;
    }
}
</style>