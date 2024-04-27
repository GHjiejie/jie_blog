<template>
    <div class="TagList">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="name" label="标签名称"></el-table-column>
            <el-table-column prop="description" label="标签描述" width="450"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible.status" title="修改标签" width="30%" draggable>

            <form ref="updateTagForm" :model="dialogVisible.data" class="tag-form">
                <label for="tagName">标签名称</label>
                <input v-model="dialogVisible.data.name" placeholder="请输入标签名称" class="form-input">

                <label for="TagDescription">标签描述</label>
                <textarea v-model="dialogVisible.data.description" placeholder="请输入标签描述" class="form-textarea" cols="30"
                    rows="5"></textarea>
            </form>
            <template #footer>
                <span>
                    <el-button @click="dialogVisible.status = false">取消</el-button>
                    <el-button type="primary" @click="submitUpdate">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
import axios from 'axios'


const tableData = ref([]);
const updateTagForm = ref(null);
const dialogVisible = reactive({
    id: '',
    status: false,
    data: {}
})

// 初始化原来的弹窗数据
const initDialog = () => {
    // 清除之前的数据
    dialogVisible.id = '';
    dialogVisible.status = false;
    dialogVisible.data = {};
}

// 页面初始化
onMounted(async () => {
    initDialog();
    const res = await axios.get('/api/tag');
    tableData.value = res.data.data;

});

// 修改
const handleUpdate = (row) => {
    console.log(2);
    dialogVisible.id = row._id;
    dialogVisible.status = true;
    dialogVisible.data = row;
};
// 提交修改的数据
const submitUpdate = async () => {
    const res = await axios.put(`/api/tag/${dialogVisible.id}`, dialogVisible.data);
    if (res.data.code === 200) {
        ElMessage({
            message: '修改成功',
            type: 'success',
        });
        dialogVisible.status = false;
        // 下面的代码不必要了
        // tableData.value = tableData.value.map(item => {
        //     if (item._id === dialogVisible.id) {
        //         return dialogVisible.data;
        //     } else {
        //         return item;
        //     }
        // });
    } else {
        ElMessage({
            message: '修改失败',
            type: 'error',
        });

    }
};


// 删除标签
const handleDelete = async (row) => {
    ElMessageBox.confirm(
        '此操作将永久删除该标签, 请确保你的文章已经不包含使用该标签的内容, 是否继续?',
        '警告',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            const res = await axios.delete(`/api/tag/${row._id}`);
            if (res.data.code === 200) {
                ElMessage({
                    message: '删除成功',
                    type: 'success',
                });
                tableData.value = tableData.value.filter(item => item._id !== row._id);
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消成功',
            })
        })



};

</script>
<style lang="scss" scoped>
.tag-form {
    max-width: 400px;
    margin: 0 auto;



    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input,
    textarea {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .form-input {
        height: 30px;
        /* 调整输入框高度 */
    }

    .form-textarea {
        resize: vertical;
        /* 允许垂直调整文本域大小 */
    }
}
</style>