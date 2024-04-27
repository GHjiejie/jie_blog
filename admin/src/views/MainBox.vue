<template>
    <div class="AdminBox">
        <el-container>
            <el-header class="header">
                <p>洁的网站后台</p>
            </el-header>

            <el-container>

                <el-aside width="250px" :style="{ height: windowHeight - 60 + 'px' }" class="aside">
                    <el-scrollbar>
                        <el-menu :default-active="currentPath" class="manageList" :router="true">

                            <!-- 首页 -->
                            <el-menu-item index="/home">
                                <template #title>
                                    <span>首页</span>
                                </template>
                            </el-menu-item>

                            <!-- 博客文章管理 -->
                            <el-sub-menu index="/blog-manage">
                                <template #title>
                                    <span>文章管理</span>
                                </template>
                                <el-menu-item index="/blog-manage/addBlog"><span>新建博客</span></el-menu-item>
                                <!-- <el-menu-item index="/blog-manage/blogDetail/:id"><span>博客详情</span></el-menu-item> -->

                                <!-- <el-menu-item index="/blog-manage/updateBlog/:id"><span>修改博客</span></el-menu-item> -->
                                <!-- <el-menu-item index="/blog-manage/deleteBlog"><span>删除博客</span></el-menu-item> -->
                                <el-menu-item index="/blog-manage/blogList"><span>博客列表</span></el-menu-item>

                            </el-sub-menu>

                            <!-- 用户管理 -->
                            <el-sub-menu index="/user-manage">
                                <template #title>
                                    <span>用户管理</span>
                                </template>
                                <el-menu-item index="/user-manage/AddUser"><span>新建用户</span></el-menu-item>
                                <!-- <el-menu-item index="/blog-manage/blogDetail/:id"><span>博客详情</span></el-menu-item> -->

                                <!-- <el-menu-item index="/blog-manage/updateBlog/:id"><span>修改博客</span></el-menu-item> -->
                                <!-- <el-menu-item index="/blog-manage/deleteBlog"><span>删除博客</span></el-menu-item> -->
                                <el-menu-item index="/user-manage/UserList"><span>用户列表</span></el-menu-item>

                            </el-sub-menu>

                            <!-- 评论管理 -->
                            <!-- <el-sub-menu index="/comment-manage">
                                <template #title> <span>评论管理</span></template>
                                <el-menu-item index="/comment-manage/replyComment"><span>回复评论</span></el-menu-item>
                                <el-menu-item index="/comment-manage/deleteComment"><span>删除评论</span></el-menu-item>
                            </el-sub-menu> -->
                            <!-- 收到反馈 -->
                            <el-menu-item index="/feedback/feedbackList">
                                <template #title>
                                    <span>收到反馈</span>
                                </template>
                            </el-menu-item>

                            <!-- 分类与标签 -->
                            <!-- <el-sub-menu index="/classification-manage">
                                <template #title> <span>分类</span></template>

                                <el-menu-item
                                    index="/classification-manage/addClassification"><span>新建分类</span></el-menu-item>
                                <el-menu-item
                                    index="/classification-manage/updateClassification"><span>修改分类</span></el-menu-item>
                                <el-menu-item
                                    index="/classification-manage/deleteClassification"><span>删除分类</span></el-menu-item>
                                <el-menu-item
                                    index="/classification-manage/ClassificationList"><span>分类列表</span></el-menu-item>

                            </el-sub-menu> -->

                            <!-- 标签 -->
                            <el-sub-menu index="/tag-manage">
                                <template #title> <span>标签</span></template>
                                <el-menu-item index="/tag-manage/addTag"><span>新建标签</span></el-menu-item>
                                <!-- <el-menu-item index="/tag-manage/updateTag"><span>更新标签</span></el-menu-item> -->
                                <!-- <el-menu-item index="/tag-manage/deleteTag"><span>删除标签</span></el-menu-item> -->
                                <el-menu-item index="/tag-manage/tagList"><span>标签列表</span></el-menu-item>
                            </el-sub-menu>

                            <!-- 统计和分析 -->
                            <el-sub-menu index="/statisticsAndanalysis">
                                <template #title> <span>统计</span></template>
                                <el-menu-item index="/statisticsAndanalysis/statistics"><span>统计</span></el-menu-item>
                                <!-- <el-menu-item index="/statisticsAndanalysis/analysis"><span>分析</span></el-menu-item> -->
                            </el-sub-menu>

                            <!-- 博客主题 -->
                            <el-menu-item index="/theme-manage">
                                <template #title> <span>博客主题</span></template>
                            </el-menu-item>

                            <!-- 关于我 -->
                            <el-sub-menu index="/aboutMe">
                                <template #title> <span>关于我</span></template>
                                <el-sub-menu index="/aboutMe/lifeWall">
                                    <template #title> <span>我的生活</span></template>
                                    <el-menu-item index="/aboutMe/life/lifeWallList"><span>生活墙</span></el-menu-item>
                                    <el-menu-item index="/aboutMe/life/lifeWallEdit"><span>编辑生活墙</span></el-menu-item>
                                    <el-menu-item index="/aboutMe/life/lifeImgCategory"><span>生活照片类别</span></el-menu-item>

                                </el-sub-menu>
                                <el-sub-menu index="/aboutMe/skillWall">
                                    <template #title> <span>我的技能</span></template>
                                    <el-menu-item index="/aboutMe/skill/skillWallList"><span>技能墙</span></el-menu-item>
                                    <el-menu-item index="/aboutMe/skill/skillWallEdit"><span>编辑技能墙</span></el-menu-item>
                                </el-sub-menu>
                                <el-sub-menu index="/aboutMe/projectWall">
                                    <template #title> <span>我的项目</span></template>
                                    <el-menu-item index="/aboutMe/project/projectWallList"><span>项目墙</span></el-menu-item>
                                    <el-menu-item index="/aboutMe/project/projectWallEdit"><span>编辑项目墙</span></el-menu-item>
                                </el-sub-menu>
                            </el-sub-menu>
                        </el-menu>
                    </el-scrollbar>
                </el-aside>


                <el-main class="main">
                    <el-scrollbar>


                        <router-view></router-view>

                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import router from '../router';

const currentPath = ref('');
// 获取浏览器窗口高度
const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// 获取当前的路径
onMounted(() => {
    // 通过vue-router提供的响应式对象来获取当前路径
    // console.log(router.currentRoute.value.path);
    currentPath.value = router.currentRoute.value.path;

});

watch(() => router.currentRoute, (to, from) => {
    currentPath.value = to.path;
});

</script>
<style scoped lang="scss">
.AdminBox {
    background-color: transparent;
}

.header {
    width: 100vw;
    position: fixed;
    top: 0;
    background-color: #000000;
    text-align: center;
    line-height: 60px;
    // border-radius: 0.8rem 0.8rem 0 0;
    // border-radius: 1rem;
    z-index: 666;

    p {
        color: #e6caca;
        font-size: 1.5rem;
        font-weight: bold;
        font-style: italic;
        text-shadow: 3px 5px 10px rgba(255, 255, 255, 0.5);
        // 设置每个字的间距
        letter-spacing: 0.5rem;

    }
}

.aside {
    margin-top: 60px;

    .manageList {
        span {
            font-size: 0.7rem;
            font-weight: bolder;
        }
    }
}

.main {
    margin-top: 60px;
    height: calc(100vh - 60px);
    // width: 85vw;
}
</style>