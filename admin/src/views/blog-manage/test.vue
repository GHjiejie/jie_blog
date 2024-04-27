<template>
    <div class="blogList">
        <div class="title"><span>智慧聚集地 </span></div>

        <div class="card" ref="cardRef">
            <KeepAlive>
                <div class="front" v-if="showFront">
                    <el-button @click="prompt" class="info"> 提示 </el-button>
                    <el-timeline>
                        <el-timeline-item :timestamp="timeSet" placement="top" v-for="(timeSet, index) in dateSet">
                            <template v-for="(item, index) in blogList">
                                <template v-if="computedTime(item.time) === timeSet">
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
            </KeepAlive>
            <div class=" back">

                <div class="main">

                    <div class="blogAnchor">
                        <ul>
                            <button class="backBtn" @click="back">返回</button>
                            <li v-for="item in anchorList">
                                <a :href="'#' + item.id" @click="smoothGo">{{ item.title }}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="content" ref="blogRef" v-html="blogContent"></div>
                </div>
            </div>

        </div>
    </div>

    <el-drawer v-model="drawer.value" :with-header="false" size="60%" @close="closeDrawer">
        <BlogUpdate :blogObj="drawer.blog"></BlogUpdate>
    </el-drawer>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, reactive } from 'vue';
import router from '../../router/index';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { ElNotification } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import BlogUpdate from './BlogUpdate.vue';
// const date = ref(new Date().toLocaleDateString());
const blogList = ref([]);
const dateSet = ref([]);
const cardRef = ref(null);
const blogRef = ref(null);
const backRef = ref(null);
const anchorList = ref([]);
const showFront = ref(true);
const blogContent = ref('');

// 设置抽屉对象
const drawer = reactive({
    value: false,
    blog: {}
});




// 关闭抽屉
const closeDrawer = () => {
    drawer.value = false;
}


// 编辑博客
const editBlog = async (id) => {
    const res = await axios.get(`/api/blog/${id}`);
    if (res.data.code === 200) {
        console.log('获取博客详情成功');
        // 打开抽屉
        drawer.value = true;
        // 将博客内容传递给抽屉组件


        drawer.blog = res.data.data;
        // console.log(drawer);

    } else {
        console.log('获取博客详情失败');
    }

}

// 获取博客列表
const getBlogList = async () => {
    const res = await axios.get('/api/blog');
    if (res.data.code === 200) {
        console.log(res.data.data);
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
        console.log('删除博客成功');

        return true;
    } else {
        console.log('删除博客失败');
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
// 提示按钮
const prompt = () => {
    // console.log('点击info按钮');
    ElNotification({
        title: '提示',
        message: '如果无法用鼠标滑动页面，请将鼠标置于左侧空白处滑动,不要问我为什么，我也不知道......',
        type: 'info',
        duration: 2500
    })
}
// 返回列表页
const back = () => {
    const content = document.querySelector('.content');
    // console.log(blogRef.value);

    showFront.value = true;

    cardRef.value.classList.remove('cardInvert');

    setTimeout(() => {
        // 清空锚点列表
        anchorList.value = [];

        // console.log('清空内容');
        content.innerHTML = '';
    }, 500);



}

// 页面初始化
onMounted(async () => {
    // 获取博客列表
    getBlogList();
});

// 博客详情页
const blogDetail = async (id) => {
    // 为timelineRef.value添加一个新的class，然后在css中对这个class进行样式设置，这样就可以实现timeline的反转了。:


    const res = await axios.get(`/api/blog/${id}`);

    // 判断数据是否显示成功
    if (res.data.code === 200) {

        cardRef.value.classList.add('cardInvert');
        const content = document.querySelector('.content');

        const article = res.data.data.content;
        // 将正面数据内容隐藏，防止撑大背面内容
        showFront.value = false;
        content.innerHTML = article;
        // blogContent.value = res.data.data.content;

        await getAnchor(blogRef.value);
        // 设置配置项
        hljs.configure({
            // 修改默认选择器
            cssSelector: ' pre code , pre',
            // 是否自动检测语言
            autoDetect: true,
            ignoreUnescapedHTML: true,
        })

        // 清除之前的高亮

        // 使代码高亮
        hljs.highlightAll();

        // hljs.initHighlighting();

        // 获取锚点


    } else {
        console.log('获取博客详情失败');
    }


}


// 对博客列表进行分组
const getBlogTimeSet = (list) => {
    const arr = [];
    list.forEach((item) => {
        const time = item.time.slice(0, 10);
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

// 实现锚点平滑滚动
const smoothGo = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1); // 去掉锚点前面的#
    // 通过id选择器获取锚点
    const anchor = document.getElementById(targetId);
    if (anchor) {
        anchor.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

//获取锚点
const getAnchor = async (article) => {
    // console.log(article);
    // 获取article里面的所有h标签
    const hList = article.querySelectorAll('h1,h2');

    // 为里面的h标签添加id
    hList.forEach((item) => {
        // 使用正则表达式去除标签中的空格和特殊字符，转为小写
        const id = item.innerText.replace(/[^\w\u4e00-\u9fa5]+/g, '').toLowerCase();
        item.id = id;
    });
    // console.log(hList);
    // console.log(article);
    hList.forEach((item) => {
        const anchor = {};
        anchor.id = item.id;
        anchor.title = item.innerText;
        anchorList.value.push(anchor);
    });

    // 将内容显示到页面中
    // console.log(anchorList.value);
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

    .card {
        // width: 100vw;
        position: relative;
        perspective: 1000px;
        // 该死，之前一直没有想到这个属性，导致一直没有实现翻转效果
        transform-style: preserve-3d;
        transition: transform 0.8s;

        .front {
            // padding: 0 1rem;
            position: absolute;
            top: 0;
            width: 50vw;
            // background-color: red;
            height: 80vh;
            left: calc(50% - 25vw);
            backface-visibility: hidden;
            border-radius: 1rem;

            .info {
                width: 20%;
                margin: 0 auto;
                background-color: rgb(232, 222, 222);
                color: #000000;
                font-size: 1rem;
                font-weight: bolder;
                border-radius: 2rem;
                border: none;
                margin-bottom: 1rem;
                margin-top: 0.5rem;
            }

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

        .back {
            // background-color: rgb(242, 238, 238);
            position: absolute;
            width: 80vw;
            height: 80vh;
            overflow: hidden;
            left: calc(50% - 40vw);
            transform: rotateY(180deg);
            backface-visibility: hidden;
            border-radius: 1rem;
            // margin: 1rem 0;



            ::-webkit-scrollbar {
                width: 0px;
                height: 5px;
            }

            /* 修改滚动条轨道颜色 */
            ::-webkit-scrollbar-track {
                background: #000000;
            }

            /* 修改滚动条滑块颜色 */
            ::-webkit-scrollbar-thumb {
                background: deepskyblue;
            }

            .main {

                display: flex;
                justify-content: space-between;
                flex-direction: row-reverse;

                .blogAnchor {
                    padding: 1.5rem 0;
                    box-sizing: border-box;
                    width: 22%;
                    height: 80vh;
                    overflow-y: auto;

                    ::-webkit-scrollbar {
                        width: 0px;
                    }

                    .backBtn {
                        background-color: rgb(255, 255, 255);
                        color: #000000;
                        font-size: 1rem;
                        font-weight: bolder;
                        border-radius: 2rem;
                        border: none;
                        margin-bottom: 1rem;
                    }


                    a {
                        text-decoration: none;
                        // color: red;

                        h1 {
                            font-size: 1.5rem;
                            // color: rgb(0, 0, 0);
                            font-weight: bolder;
                        }

                        h2 {
                            font-size: 1.1rem;
                            // color: rgb(0, 0, 0);
                            font-weight: bolder;
                        }

                    }

                    li {
                        list-style: none;
                        line-height: 3rem;
                    }
                }

                .content {
                    width: 60vw;
                    height: 80vh;
                    overflow: auto;
                    box-sizing: border-box;
                    padding: 0 2rem;
                    line-height: 3rem;
                    border-right: 1px solid rgba(0, 0, 0, 0.119);

                    a {
                        text-decoration: none;
                        color: rgb(255, 0, 0);
                    }


                    li {
                        margin-left: 1rem;
                    }

                    // 使用深度选择器修改样式(通常用于修改第三方组件的样式)
                    :deep(pre) {
                        padding: 0 1rem;
                        background-color: rgba(0, 13, 255, 0.049);
                        // border: 1px solid #afa3a324;
                        overflow: auto;
                        font-weight: bold;

                        code {
                            background-color: rgba(0, 13, 255, 0.049);
                            line-height: 2.5rem;
                            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                            // font-weight: bolder;
                        }
                    }
                }

                // 下面这段代码要不得啊，会导致鼠标覆盖的优先级高于页面滚动的优先级，导致页面无法滚动
                .content:hover {
                    cursor: pointer;
                }
            }

        }

        .backInvert {
            transform: rotateY(180deg);
        }

    }

    .cardInvert {
        transform: rotateY(180deg);
        height: auto;
    }




}
</style>