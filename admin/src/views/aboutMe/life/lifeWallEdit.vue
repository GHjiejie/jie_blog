<template>
    <div class="lifeWall">
        <div class="title"><span>添加生活照片</span> </div>
        <el-form :model="form" label-width="120px">

            <el-form-item label="类别">
                <el-select v-model="form.category" placeholder="选择照片所属的类别">
                    <el-option :label=item v-for=" item in myLifeCategoryList" :value=item />
                </el-select>
            </el-form-item>
            <el-form-item label="图片描述">
                <el-input v-model="form.discription" type="textarea" />
            </el-form-item>

            <div class="inputPhotoBox">
                <el-button type="primary" plain @click="uploadImg"> 上传图片</el-button>
                <input type="file" ref="inputRef" class="uploadImg">
                <template v-if="imgStatus">
                    <div>
                        <img :src="imgUrl" alt="">
                    </div>
                </template>
            </div>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script  setup>
import axios from 'axios'
import { ElMessage } from 'element-plus';
import { reactive, ref, onMounted } from 'vue'
const inputRef = ref(null);
const imgStatus = ref(false);
const imgUrl = ref('');
const myLifeCategoryList = ref({});

// do not use same name with ref
const form = reactive({
    category: '',
    discription: '',
});


const uploadImg = () => {
    inputRef.value.click();
    inputRef.value.onchange = handleFile;

}
// 页面初始化
onMounted(async () => {
    const res = await axios({
        method: 'get',
        url: '/api/mylifeimgcategory',
    })
    if (res.status === 200) {
        // 将里面的数据过滤出来
        myLifeCategoryList.value = res.data.map(item => item.categoryName);
    } else {
        ElMessage({
            type: 'error',
            message: '图片类别获取失败'
        });
    }
})

// 处理文件上传
const handleFile = () => {
    console.log('文件发生变化');
    // 因为我们只有一个文件，所以我们可以直接取第一个，不然的话数组可以取到后面
    const file = inputRef.value.files[0];
    if (file) {
        imgStatus.value = true;
        imgUrl.value = URL.createObjectURL(file);
    }
}

// 提交表单
const onSubmit = async () => {
    // 首先判断是否填写完整
    if (!form.category || !form.discription || !inputRef.value.files[0]) {
        ElMessage({
            type: 'error',
            message: '请填写完整信息'
        });
        return;
    }
    // console.log(form);
    const res = await axios({
        method: 'post',
        url: '/api/mylifeimg',
        data: {
            category: form.category,
            discription: form.discription,
            imgFile: inputRef.value.files[0],
        },
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (res.status === 200) {
        ElMessage({
            type: 'success',
            message: '添加成功'
        });
    } else {
        ElMessage({
            type: 'error',
            message: '添加失败'
        });
    }
}
</script>

<style lang="scss" scoped>
.lifeWall {
    width: 90%;


    // background-color: red;
    .title {
        text-align: center;
        font-size: 2rem;
        font-weight: bolder;
        padding: 0 0 2rem;
    }


    .inputPhotoBox {
        margin: 2rem 120px;
        // background-color: red;

        img {
            margin-top: 2rem;
            width: 15rem;
            height: 15rem;
            object-fit: cover;
            transition: all 0.3s;

        }



        .uploadImg {
            display: none;
        }
    }
}
</style>
