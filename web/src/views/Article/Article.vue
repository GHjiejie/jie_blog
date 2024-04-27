<template>
    <div class="article">
        <div class="title">文章分类</div>

        <div v-for="(item, index) in categories" :key="item._id">
            <div class="categoryItem" @click="goBlogListByTag(item.name, index)">
                <h2>{{ item.name }}</h2>
                <p>{{ item.description }}</p>

            </div>
        </div>

        <div class="divider"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../../routes/index';

const categories = ref([]);
const activeIndex = ref(-1);

// 根据标签跳转到文章列表
const goBlogListByTag = (tagName, index) => {
    if (activeIndex.value === index) {
        activeIndex.value = -1;
    } else {
        activeIndex.value = index;
        router.push({
            path: `/ArticleList/${tagName}`,
        })
    }
}

// 页面初始化
onMounted(async () => {
    const res = await axios.get('/web/tag');
    categories.value = res.data.data;
});
</script>

<!-- PC端样式 -->
<style lang="scss" scoped>
.article {
    overflow: hidden;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 auto;
    background-color: #fff;

    .title {
        font-size: 2.5rem;
        color: #000000;
        margin-top: 60px;
        margin-bottom: 1rem;
        font-weight: bold;
        text-align: center;
    }

    .categoryItem {
        overflow: auto;
        background-color: #f8f8f8;
        line-height: 2rem;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.279);
        padding: 2rem;
        margin: 1.5rem auto;
        width: 60%;
        height: auto;
        transition: all 0.3s ease-in-out;

        h2 {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 10px;
        }

        p {
            font-size: 0.8rem;
            color: #666;
            line-height: 1.5;
        }

        &:hover {
            cursor: pointer;
            box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.279);
        }
    }

    .divider {
        width: 100%;
        height: 2px;
        background-color: #ada3a349;
        margin-bottom: 3rem;
    }
}
</style>

<!-- 移动端样式 -->
<style lang="scss" scoped>
@media (max-width: 768px) {
    .article {
        .title {
            font-size: 2rem;
            margin-top: 40px;
            margin-bottom: 1rem;
        }

        .categoryItem {
            width: 80%;
            padding: 1rem;
            margin: 1rem auto;
            box-shadow: none;
            border-radius: 1rem;

            h2 {
                font-size: 1.2rem;
            }

            p {
                font-size: 0.8rem;
            }
        }
    }
}
</style>