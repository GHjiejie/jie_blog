<template>
    <div class="lifeCategory">
        <div class="title">生活墙图片类别</div>
        <div class="categoryList">
            <el-table :data="myLifeCategoryList" style="width: 100%">
                <el-table-column fixed prop="_id" label="名称ID" width="250" />
                <el-table-column prop="categoryName" label="类别名称" width="150" />

                <el-table-column fixed="right" label="操作" width="150">
                    <template #default="scope">
                        <el-popconfirm title="你确定要删除这个类别吗?" @confirm="confirmEvent(scope.row._id)">
                            <template #reference>
                                <el-button link type="primary" size="small">删除</el-button>
                                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-button class="mt-4" style="width: 100%" @click="showAddCategoryPanel">添加类别</el-button>

        </div>
        <el-dialog v-model="dialogVisible" title="添新的类名" width="30%" draggable>
            <div class="categoryBox">
                <input type="text" id="category" ref="inuptRef" class="inputBox" placeholder="请输入标签名称">
                <el-button type="primary" plain @click="submitForm">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'

import axios from 'axios'
import { ElMessage } from 'element-plus';
let categoryName = '';

const inuptRef = ref(null);

const dialogVisible = ref(false);

const myLifeCategoryList = ref([]);



// 添加类别
const showAddCategoryPanel = async () => {
    dialogVisible.value = true;
    // const res = await axios({
    //     method: 'post',
    //     url: '/api/mylifeimgcategory',
    //     data: {
    //         categoryName
    //     }

    // })
    // if (res.status === 200) {
    //     ElMessage({
    //         type: 'success',
    //         message: '添加成功'
    //     });
    //     inuptRef.value.value = '';
    //     // 重新更新表格
    //     myLifeCategoryList.value.push(res.data);
    // } else {
    //     ElMessage({
    //         type: 'error',
    //         message: '添加失败'
    //     })
    // }
}

// 确认删除操作
const confirmEvent = async (id) => {
    const res = await axios({
        method: 'delete',
        url: `/api/mylifeimgcategory/${id}`,
    });
    if (res.status === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        // 重新更新表格
        myLifeCategoryList.value = myLifeCategoryList.value.filter(item => item._id !== id);
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}

// 初始化数据
onMounted(async () => {
    const res = await axios({
        method: 'get',
        url: '/api/mylifeimgcategory',
    })
    if (res.status === 200) {
        // console.log(res.data);
        // 将里面的数据过滤出来
        myLifeCategoryList.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: '图片类别获取失败'
        });
    }
});

// 提交表单
const submitForm = async () => {
    categoryName = inuptRef.value.value;
    // console.log(categoryName);
    if (!categoryName) {
        ElMessage({
            type: 'error',
            message: '请输入新的标签名称'
        });
        return;
    }
    const res = await axios({
        method: 'post',
        url: '/api/mylifeimgcategory',
        data: {
            categoryName
        }

    })
    if (res.status === 200) {
        ElMessage({
            type: 'success',
            message: '添加成功'
        });
        inuptRef.value.value = '';
        // 重新更新表格
        myLifeCategoryList.value.push(res.data);
    } else {
        ElMessage({
            type: 'error',
            message: '添加失败'
        })
    }

}

</script>
<style lang="scss" scoped>
.lifeCategory {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background-color: red;

    .title {
        font-size: 2rem;
        font-weight: bolder;
        padding: 0 0 2rem;
    }

    .categoryBox {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        // background-color: rgb(235, 229, 229);
        border: 1px solid #ccc;

        .inputBox {
            // width: 50%;
            // margin: 0 auto;
            padding: 0.5rem 1rem;
            outline: none;
            border: none;
            border-radius: 2rem;
            border: 1px solid #ccc;
        }

        .el-button {
            margin-top: 2rem;
        }
    }



}
</style>