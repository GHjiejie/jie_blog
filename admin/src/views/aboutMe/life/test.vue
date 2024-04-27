<template>
    <el-table :data="myLifeCategoryList" style="width: 100%" max-height="250">
        <el-table-column fixed prop="_id" label="名称ID" width="150" />
        <el-table-column prop="categoryName" label="类别名称" width="120" />

        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                    Remove
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem">Add Item</el-button>
</template>

<script  setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus';

const myLifeCategoryList = ref({});

// 初始化数据
onMounted(async () => {
    const res = await axios({
        method: 'get',
        url: '/api/mylifeimgcategory',
    })
    if (res.status === 200) {
        console.log(res.data);
        // 将里面的数据过滤出来
        myLifeCategoryList.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: '图片类别获取失败'
        });
    }
});


const deleteRow = (index) => {
    tableData.value.splice(index, 1)
}

const onAddItem = () => {
    now.setDate(now.getDate() + 1)
    tableData.value.push({
        date: dayjs(now).format('YYYY-MM-DD'),
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    })
}
</script>
