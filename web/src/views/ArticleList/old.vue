<template>
    <!-- 返回按钮 -->
    <div class="articleList">
        <div class="top">
            <el-button type="primary" @click="goBack" class="backBtn">返回</el-button>
            <div class="title">{{ blogName }}</div>
        </div>
        <div class="ListDetail" ref="ListDetailRef">
            <el-timeline>
                <el-timeline-item :timestamp="timeSet" placement="top" v-for="(timeSet, index) in dateSet">
                    <template v-for="(item, index) in blogList">
                        <template v-if="computedTime(item.published) === timeSet">
                            <el-card class="blogCard" @click="blogDetail(item._id, item.tag)">
                                <h3>{{ item.title }}</h3>
                                <div class="tagAndoperate">
                                    <div class="tag">{{ item.tag }}</div>
                                </div>
                                <div class="time">{{ item.author }} committed {{ item.published }}</div>
                            </el-card>
                        </template>
                    </template>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'
import axios from 'axios'
const route = useRouter();

let blogName = ref('');
const blogList = ref([]);
const dateSet = ref([]);

const ListDetailRef = ref(null);

// 页面初始化
onMounted(async () => {


    blogList.value = [];
    // const loading = ElLoading.service({
    //     lock: true,
    //     text: 'Loading',
    //     background: 'rgba(0, 0, 0, 0.7)',
    // });
    blogName.value = route.currentRoute.value.params.TagName;
    await getBlogListByTag(blogName.value);
    // loading.close();
});

// 返回按钮
const goBack = () => {
    route.back();
}

//详情页
const blogDetail = (id, tag) => {
    route.push({
        path: `/ArticleList/${tag}/${id}`,
    })
}

// 根据标签名来获取博客列表
const getBlogListByTag = async (tagName) => {
    const res = await axios.get(`/web/blog/tag/${tagName}`);
    if (res.data.code !== 200) {
        throw new Error(res.data.message);
    } else {
        // console.log('获取博客列表成功');
        blogList.value = res.data.data;
        getBlogTimeSet(blogList.value);
        // console.log(blogList.value);
    }
}
// 对博客列表进行分组
const getBlogTimeSet = (list) => {
    // console.log(list);
    const arr = [];
    list.forEach((item) => {
        // 把后面的8个字符去掉

        const time = item.published.slice(0, item.published.length - 8);
        if (!arr.includes(time)) {
            arr.push(time);
        }
    });

    dateSet.value = arr.reverse();

}

//获取博客时间
const computedTime = (time) => {
    return time.slice(0, time.length - 8);
}
</script>

<style scoped lang="scss">
.articleList {
    box-sizing: border-box;

    padding: 2rem;
    height: 100vh;
    // width: 100vw;
    overflow: hidden;
    border: 2px solid red;


    .top {
        width: 90%;
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
        background-color: rgb(0, 0, 0);
        // padding: 1rem;
        height: 60px;
        // z-index: 999;



        .backBtn {
            background-color: rgb(255, 255, 255);
            color: #000000;
            font-size: 1.2rem;
            font-weight: bolder;
            border-radius: 2rem;
            border: none;

            &:hover {
                background-color: rgb(137, 213, 214);
            }
        }


        .title {
            font-size: 2rem;
            color: #ffffff;
            margin: 0 auto;
            font-weight: bolder;
            text-align: center;
            font-style: italic;
            text-shadow: 2px 5px 5px rgba(255, 255, 255, 0.638);
        }
    }

    .ListDetail {
        box-sizing: border-box;
        width: 90%;
        height: 80vh;
        margin: 100px auto;




        .blogCard {
            cursor: pointer;
            padding: 0.5rem;
            margin-bottom: 1rem;
            animation: fadeIn 0.5s ease-in-out;

            @keyframes fadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }

                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

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
