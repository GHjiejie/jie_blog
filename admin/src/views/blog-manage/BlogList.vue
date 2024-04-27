<template>
    <div class="blogList">
        <div class="title"><span>智慧聚集地 </span></div>


        <div class="ListDetail">
            <el-timeline>
                <el-timeline-item :timestamp="timeSet" placement="top" v-for="(timeSet, index) in dateSet">
                    <template v-for="(item, index) in blogList">
                        <template v-if="computedTime(item.published) === timeSet">
                            <el-card class="blogCard" @click="blogDetail(item._id)">
                                <h3>{{ item.title }}</h3>
                                <div class="tagAndoperate">
                                    <div class="tag">{{ item.tag }}</div>
                                    <!-- 使用stop修饰符阻止事件冒泡 -->
                                    <div class="operate">
                                        <Edit style="width: 1.6em; height: 1.6em; margin-right: 8px ;color: green;"
                                            @click.stop="editBlog(item._id)" z-index="666" />
                                        <Delete style="width: 1.6em; height: 1.6em; margin-right: 8px;color: red;"
                                            @click.stop="delBlog(item._id)" />
                                    </div>

                                </div>
                                <div class="time">{{ item.author }} committed {{ item.time }}</div>

                            </el-card>
                        </template>
                    </template>
                </el-timeline-item>
            </el-timeline>
        </div>

    </div>

    <el-drawer v-model="showEdit" :with-header="false" size="60%" @close="closeDrawer">
        <BlogEdit :blogObj="blogContent"></BlogEdit>
    </el-drawer>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, reactive } from 'vue';
import router from '../../router/index';
import { ElLoading } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import BlogEdit from './BlogEdit.vue';
// const date = ref(new Date().toLocaleDateString());
const blogList = ref([]);
const dateSet = ref([]);
const showEdit = ref(false);
const blogContent = ref({});




// 页面初始化
onMounted(async () => {
    // 获取博客列表
    getBlogList();
    blogContent.value = null;
});

// 点击编辑博客按钮
const editBlog = async (id) => {
    // 首先判断博客内容是否为空，如果不为空则清空博客内容，否则会叠加，或者直接清除原来的博客内容
    // 显示加载数据的动画
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    try {
        const res = await axios.get(`/api/blog/${id}`);
        if (res.data.code === 200) {
            blogContent.value = res.data.data;
            // 关闭加载数据的动画
            loading.close();
            // 显示编辑博客组件
            showEdit.value = true;
        }
    } catch (error) {
        // 弹窗提示
        ElMessage({
            type: 'error',
            message: '获取博客内容失败',
        })
    }

}
// 关闭编辑博客组件
const closeDrawer = () => {
    showEdit.value = false;
}

//详情页
const blogDetail = (id) => {
    router.push(`/blog-manage/blogDetail/${id}`);
}


// 获取博客列表
const getBlogList = async () => {
    const res = await axios.get('/api/blog');
    if (res.data.code === 200) {
        // console.log(res.data.data);
        // 获取博客时间集
        getBlogTimeSet(res.data.data);
        blogList.value = res.data.data;
    } else {
        console.log('获取博客列表失败');
    }

}

// 删除博客服务
const deleteBlogServer = async (id) => {
    const res = await axios.delete(`/api/blog/${id}`);
    if (res.data.code === 200) {
        // console.log('删除博客成功');
        return true;
    } else {
        // console.log('删除博客失败');
        return false;
    }
}

// 删除博客
const delBlog = async (id) => {
    // console.log('输出id', id);
    ElMessageBox.confirm('此操作将永久删除该博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true,
    }).then(() => {
        // 发送请求删除博客
        if (deleteBlogServer(id)) {
            // 刷新博客列表
            getBlogList();
            ElMessage({
                type: 'success',
                message: '删除成功!'
            });
        }

    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已取消删除'
        });
    });
}

// 对博客列表进行分组
const getBlogTimeSet = (list) => {
    console.log(list);
    const arr = [];
    list.forEach((item) => {
        const time = item.published.slice(0, 10);
        if (!arr.includes(time)) {
            arr.push(time);
        }
    });
    console.log(arr);
    dateSet.value = arr;
    console.log(dateSet.value);
}

//获取博客时间
const computedTime = (time) => {
    return time.slice(0, 10);
}




</script>

<style lang="scss" scoped>
.blogList {
    .title {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        font-weight: bolder;
        font-size: 1.5rem;
        width: 90%;
        margin: 0 auto;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid rgba(180, 166, 166, 0.144);
    }

    .ListDetail {
        width: 50vw;
        height: 80vh;
        margin: 1rem auto;


        .blogCard {
            cursor: pointer;
            padding: 0.5rem;
            margin-bottom: 1rem;

            .tagAndoperate {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .tag {
                    color: blue;
                    padding: 0.8rem 0;
                }
            }


            .time {
                color: rgb(162, 172, 172);
                font-size: 0.8rem;
            }
        }

        .blogCard:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
        }
    }



}
</style>