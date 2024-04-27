<template>
    <div class="blogDetail fadeInanimation" ref="blogDetailRef">
        <div class="anchorTop">
            <div class="TopBackBtn" @click="back">返回</div>
            <div class="menu" @click="clickMenu">菜单</div>
        </div>
        <div class="content" v-html="blogRef"></div>
        <div class="blogAnchor">
            <ul>
                <button class="backBtn" @click="back">返回</button>
                <li v-for="item in anchorList">
                    <a :href="'#' + item.id" @click="smoothGo">{{ item.title }}</a>
                </li>
            </ul>
        </div>
        <!-- <CommentMoudle></CommentMoudle> -->
    </div>
    <el-drawer v-model="menuStatus" title="I am the title" :with-header="false" class="menuDetail" size="60%">
        <div class="menuTitle">
            <p>便捷导航</p>
        </div>
        <ul>
            <li v-for="item in anchorList">
                <a :href="'#' + item.id" @click="smoothGo">{{ item.title }}</a>
            </li>
        </ul>
    </el-drawer>
</template>

<script setup>
import { onMounted, ref, defineProps, watch, Comment } from 'vue';
import { useRouter } from 'vue-router';
import { ElLoading } from 'element-plus'
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import currentArticlesById from '../../stores/currentArticlesById'
// import CommentMoudle from '../Comment/Comment.vue';
const useCurrentArticlesById = currentArticlesById();
const blogDetailRef = ref(null);
// 定义路由实例对象
const router = useRouter();

const blogId = ref('');
const blogDetail = ref({});

const blogRef = ref(null);
let anchorList = ref([]);
const menuStatus = ref(false);


// 页面初始化
onMounted(async () => {
    // const loading = ElLoading.service({
    //     lock: true,
    //     text: 'Loading',
    //     background: 'rgba(0, 0, 0, 0.7)',
    // });
    // console.log(router);
    // 获取博客id
    // blogId.value = router.currentRoute.value.params.TagId;
    // blogId.value = useCurrentArticlesById.currentArticlesById;



    // 清除原来的博客详情
    blogDetail.value = null;

    blogDetail.value = useCurrentArticlesById.currentArticlesById.data;

    // 获取博客详情
    // await getBlogDetailById(blogId.value);

    // 关闭加载数据的动画
    // loading.close();

    const content = document.querySelector('.content');
    // console.log(content);

    // 将博客详情显示到页面上
    content.innerHTML = blogDetail.value.content;
    await getAnchor(content);
    hljs.configure({
        cssSelector: 'pre , pre code',
        ignoreUnescapedHTML: true
    })
    // 使代码高亮
    hljs.highlightAll();
});

// 展开菜单
const clickMenu = () => {
    menuStatus.value = true;
}

//根据标签获取博客详情
// const getBlogDetailById = async (id) => {
//     const res = await axios.get(`/web/blog/${id}`);
//     if (res.data.code !== 200) {
//         throw new Error(res.data.message);
//     } else {
//         blogDetail.value = res.data.data;
//     }
// }

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
}

// 回到上一页
const back = () => {
    blogDetailRef.value.classList.remove('fadeInanimation');
    blogDetailRef.value.classList.add('fadeOutanimation');
    // 回到之前页面浏览的位置
    setTimeout(() => {
        router.back();
    }, 0);
}
</script>

<!-- PC端样式 -->
<style lang="scss" scoped>
* {
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}

.blogDetail {
    // position: relative;
    overflow: hidden;
    width: 100%;

    .content {
        // position: absolute;
        box-sizing: border-box;
        border-right: 1px solid rgba(0, 0, 0, 0.095);
        width: 80vw;
        padding: 1rem 2.5rem;
        overflow: auto;
        line-height: 2.5rem;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        // background-color: rgba(255, 0, 0, 0.167);



        :deep(pre) {
            margin: 0.5rem 0;
            background: #f6f8fa;
            padding: 0 0.8rem;
            line-height: 2rem;
            font-size: 1rem;
            font-weight: bolder;
            overflow: auto;

        }
    }




    .blogAnchor {
        width: 15%;
        position: fixed;

        top: 1rem;
        right: 1%;
        height: 75vh;

        overflow: auto;

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
            color: red;

            &:hover {
                color: blue;
            }

        }

        li {
            list-style: none;
            line-height: 3rem;
        }
    }
}

.fadeInanimation {
    animation: fadeIn 0.5s ease-in-out;

    @keyframes fadeIn {
        0% {
            transform: translateX(-100%);
            opacity: 0;
        }

        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }

}

.fadeOutanimation {
    animation: fadeOut 0.5s ease-in-out;

    @keyframes fadeOut {
        0% {
            transform: translateX(0);
            opacity: 1;
        }

        100% {
            transform: translateX(-100%);
            opacity: 0;
        }
    }

}

.anchorTop {
    box-sizing: border-box;
    display: none;
    position: fixed;
    width: 100%;
    background-color: rgb(0, 0, 0);
    padding: 1rem;
    font-weight: bolder;
    z-index: 6;

    div {
        display: inline-block;
    }


    .TopBackBtn {
        color: white;
    }

    .menu {
        float: right;
        color: white;
    }

    &:hover {
        cursor: pointer;
    }
}

.menuDetail {
    width: 100%;
    height: 100%;

    .menuTitle {
        text-align: center;
        font-size: 1.5rem;
        font-weight: bolder;
        color: #000000;
        padding: 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.164);
    }

    ul {
        a {
            text-decoration: none;
            color: red;

            &:hover {
                color: blue;
            }
        }

        li {
            list-style: none;
            line-height: 3rem;

        }
    }
}
</style>

 <!-- 设置在移动端的样式 -->
<style lang="scss" scoped>
@media (max-width: 768px) {
    .blogDetail {
        .content {
            width: 100%;
            padding: 1rem 1.5rem;
            margin-top: 3rem;
        }

        .blogAnchor {
            display: none;
        }
    }

    .anchorTop {
        display: block;
    }
}
</style>