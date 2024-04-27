<template>
    <div class="blogDetail">
        <!-- <el-button type="primary" plain @click="back" class="backBtn">上一页</el-button> -->
        <div class="content" v-html="blogRef"></div>
        <div class="blogAnchor">
            <ul class="anchorList">
                <button class="backBtn" @click="back">返回</button>
                <li v-for="item in anchorList">
                    <a :href="'#' + item.id" @click="smoothGo">{{ item.title }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElLoading } from 'element-plus'
import axios, { all } from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const route = useRoute();
const router = useRouter();

const blogId = ref('');
const blogDetail = ref({});

const blogRef = ref(null);

let anchorList = ref([]);

// 页面初始化
onMounted(async () => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    // 获取博客id
    blogId.value = route.params.id;

    // 清除原来的博客详情
    blogDetail.value = null;

    // 获取博客详情
    await getBlogDetail(blogId.value);

    // 关闭加载数据的动画
    loading.close();

    const content = document.querySelector('.content');
    console.log(content);

    // 将博客详情显示到页面上
    content.innerHTML = blogDetail.value.content;
    console.log(blogRef.value);
    await getAnchor(content);
    // console.log(blogRef.value);
    hljs.configure({
        cssSelector: 'pre , pre code',
        ignoreUnescapedHTML: true
    })
    // 使代码高亮
    hljs.highlightAll();
});



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
    console.log(article);
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
    console.log(anchorList.value);
}
// 获取博客详情
const getBlogDetail = async (id) => {
    try {
        const res = await axios.get(`/api/blog/${id}`);
        if (res.data.code === 200) {
            // console.log('获取博客详情成功');
            blogDetail.value = res.data.data;
        }
    } catch (error) {
        alert(error);
    }

}

// 回到上一页
const back = () => {
    router.back();
}

</script>

<style lang="scss" scoped>
.blogDetail {
    // background-color: rgb(139, 100, 100);

    // 设置滚动条样式
    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    width: 100%;
    height: 100%;
    display: flex;
    // flex-direction: column;
    // align-items: center;
    // background-color: red;

    .content {
        // background-color: red;
        box-sizing: border-box;
        width: 80%;
        // background-color: red;
        height: 80vh;
        // margin-top: 1rem;
        // margin-left: 2%;
        overflow: auto;
        line-height: 2.5rem;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;


        :deep(pre) {
            margin: 0.5rem 0;
            background-color: rgb(235, 241, 241);
            border-radius: 5px;
            padding: 0 0.8rem;
            line-height: 2rem;
            font-size: 1rem;
            font-weight: bolder;

        }
    }

    .blogAnchor {
        box-sizing: border-box;
        width: 20%;
        padding: 1rem 0.5rem;
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
            color: blue;
            font-size: 0.8rem;

            &:hover {
                color: rgb(255, 0, 0);
            }

        }

        li {
            list-style: none;
            line-height: 3rem;
        }
    }
}
</style>