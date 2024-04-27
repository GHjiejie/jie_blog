<template>
    <!-- 返回按钮 -->
    <div class="frame">
        <div class="articleList">
            <div class="top">
                <el-button link @click="goBack" class="backBtn">返回</el-button>
                <div class="title">{{ blogName }}</div>
            </div>
            <div class="ListDetail" ref="ListDetailRef">
                <el-timeline>
                    <el-timeline-item :timestamp="timeSet" placement="top" v-for="(timeSet, index) in dateSet">
                        <template v-for="(item, index) in blogList">
                            <template v-if="computedTime(item.published) === timeSet">
                                <el-card class="blogCard" @click="blogDetail(item._id, item.tag, index)"
                                    :style="index === useIndexStore.activeIndex ? 'border: 1px solid red;' : ''">
                                    <h3>{{ item.title }}</h3>
                                    <div class="tagAndoperate">
                                        <div class="tag">{{ item.tag }}</div>
                                        <div class="look" v-if="index === useIndexStore.activeIndex"> 刚刚看过 </div>
                                    </div>
                                    <div class="time">{{ item.author }} committed {{ item.published }}</div>
                                </el-card>
                            </template>
                        </template>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'
import axios from 'axios'
import useArticleActiveIndexStore from '../../stores/articleActiveIndexStore'
import currentArticlesById from '../../stores/currentArticlesById'
import useArticleListBycateStore from '../../stores/articleListBycateStore'


const useStore = useArticleListBycateStore();

const useIndexStore = useArticleActiveIndexStore();

const useCurrentArticlesById = currentArticlesById();

const route = useRouter();

let blogName = ref('');
const blogList = ref([]);
const dateSet = ref([]);

const activeIndex = ref(0);

const ListDetailRef = ref(null);

// 页面初始化
onMounted(async () => {
    blogList.value = useStore.articleListBycategoryName;
    // console.log(blogList.value);
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
    route.back({
        path: '/#articleModule'
    });
}

//详情页
const blogDetail = async (id, tag, index) => {
    useIndexStore.setActiveIndex(index);
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    // 根据id获取博客详情
    const res = await useCurrentArticlesById.getCurrentArticlesById(id);
    if (res) {
        // console.log('获取博客详情成功', res);
        loading.close();
        route.push({
            path: `/ArticleList/${tag}/${id}`,
        })
    }



}

// 根据标签名来获取博客列表
const getBlogListByTag = async (tagName) => {
    const res = await useStore.getArticleListBycategoryName(tagName);
    if (res.code === 200) {
        blogList.value = useStore.articleListBycategoryName;
        getBlogTimeSet(blogList.value);
    } else {
        throw new Error(res.message);
    }
    // const res = await axios.get(`/web/blog/tag/${tagName}`);
    // if (res.data.code !== 200) {
    //     throw new Error(res.data.message);
    // } else {
    //     // console.log('获取博客列表成功');
    //     blogList.value = res.data.data;
    //     getBlogTimeSet(blogList.value);
    //     // console.log(blogList.value);
    // }
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
<!-- PC端样式 -->
<style scoped lang="scss">
* {
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}

.frame {
    box-sizing: border-box;
    padding: 0 1rem;
    width: 100%;
    animation: fadeIn 0.5s ease-in-out;

    @keyframes fadeIn {
        0% {
            transform: scale(0.5);
            opacity: 0;
        }

        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    .articleList {
        width: 100%;
        box-sizing: border-box;

        .top {
            box-sizing: border-box;
            width: 80%;
            background-color: #000000;
            border-radius: 1rem;
            position: fixed;
            top: 0;
            left: calc(50% - 40%); //居中
            height: 3rem;
            display: flex;
            align-items: center;
            padding: 0.5rem 2rem;
            z-index: 333;

            color: white;

            .backBtn {
                padding: 0.5rem;
                border-radius: 1rem;
                font-size: 0.8rem;
                font-weight: bolder;
                color: black;
                background-color: white;
                border: none;
                transition: all 0.3s ease-in-out;

                &:hover {
                    cursor: pointer;
                    background-color: #000000;
                    color: white;

                }
            }

            .title {
                font-weight: bolder;
                font-style: italic;
                margin: 0 auto;
            }


        }

        .ListDetail {
            box-sizing: border-box;
            width: 80%;
            // margin-top: 4rem;
            margin: 0 auto;
            padding: 4rem;
            border-radius: 1rem;
            // background-color: #c61a1a;
            overflow: auto;
            height: 100vh;

            .blogCard {
                box-sizing: border-box;
                width: 100%;
                padding: 1rem;
                margin: 2rem 0;
                border-radius: 1rem;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease-in-out;

                &:hover {
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                }

                h3 {
                    font-size: 1.5rem;
                    font-weight: bolder;

                }

                .tagAndoperate {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .tag {
                        padding: 0.8rem 0.5rem;
                        border-radius: 1rem;
                        // background-color: #409EFF;
                        color: #409EFF;
                    }

                    .look {
                        color: red;

                    }
                }

                .time {
                    font-size: 0.8rem;
                    color: #909399;
                    transition: all 0.3s ease-in-out;
                }
            }

        }







    }
}
</style>  

<!-- 移动端样式 -->
<style scoped lang="scss">
@media (max-width: 768px) {
    .frame {
        .articleList {
            .top {
                width: 100%;
                left: 0;
                padding: 1.5rem 1rem;
                height: 2rem;
                border-radius: 0;
                // box-sizing: border-box;
                // height: 60px;


                .backBtn {
                    padding: 0.5rem;
                    font-size: 0.8rem;
                    background-color: black;
                    color: white;
                }

                .title {
                    font-size: 1rem;
                }
            }

            .ListDetail {
                width: 100%;
                padding: 2rem 1rem;
                // margin-top: 4rem;

                .blogCard {
                    padding: 0.5rem;
                    margin: 2rem 0;

                    h3 {
                        font-size: 1.2rem;
                    }

                    .tagAndoperate {
                        .tag {
                            padding: 0.5rem 0.5rem;
                        }
                    }

                    .time {
                        font-size: 0.6rem;
                    }
                }
            }
        }
    }
}
</style>
