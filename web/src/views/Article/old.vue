<template>
    <div class="article">
        <div class="title">ARTICLE</div>

        <el-row class="categoryList" :gutter="0">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" v-for="item in categories" :key="item._id">
                <section class="categoryItem" @click="goBlogListByTag(item.name)">
                    <h2>{{ item.name }}</h2>
                    <p>
                        {{ item.description }}
                    </p>
                </section>
            </el-col>
        </el-row>

        <div class="divider"></div>

    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../../routes/index';
const categories = ref([]);

// 根据标签跳转到文章列表
const goBlogListByTag = (tagName) => {
    router.push({
        path: `/ArticleList/${tagName}`,
    })
}

// 页面初始化
onMounted(async () => {
    const res = await axios.get('/web/tag');
    // console.log(res);
    categories.value = res.data.data;
})


</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}

.article {
    overflow: hidden;
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 auto;

    .title {
        font-size: 2.5rem;
        color: #000000;
        margin: 2rem;
        font-weight: bold;
        text-align: center;
    }



    .categoryList {


        .categoryItem {

            overflow: auto;
            background-color: #f8f8f8;
            line-height: 2rem;

            border-radius: 5px;
            height: 120px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.279);
            padding: 2rem;
            // margin: 1.5rem 2rem;
            margin: 1.5rem auto;
            width: 60%;
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

        // 设置在移动端的样式

    }



    .divider {
        width: 100%;
        height: 2px;
        background-color: #ada3a349;
        margin-bottom: 3rem;

    }

}
</style>
