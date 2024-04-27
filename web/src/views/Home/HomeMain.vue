<template>
    <div class="container" @scroll="handleScroll">
        <div class="welcomeModule samePoint" ref="welcomeModuleRef" id="welcomeModule">
            <!-- <Welcome @goAboutMe="toAboutMe"></Welcome> -->
            <Welcome @goArticle="toArticle"></Welcome>
        </div>
        <!-- <div class="aboutMeModule samePoint" ref="aboutMeModuleRef" id="aboutMeModule">
            <AboutMe></AboutMe>
        </div> -->
        <div class="articleModule samePoint" ref="articleModuleRef" id="articleModule">
            <Article></Article>
        </div>
        <div class="contactModule samePoint" ref="contactModuleRef" id="contactModule">
            <Contact></Contact>
        </div>
        <div class="samePoint">
            <Footer></Footer>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Welcome from '../Welcome/Welcome.vue';
import AboutMe from '../AboutMe/AboutMe.vue';
import Article from '../Article/Article.vue';
import Contact from '../Contact/Contact.vue';
import Footer from '../Footer/Footer.vue';

const aboutMeModuleRef = ref(null);
const welcomeModuleRef = ref(null);
const articleModuleRef = ref(null);
const contactModuleRef = ref(null);







// 接受子组件传递过来的id，然后根据id获取模块的dom节点，然后调用scrollIntoView方法，让模块滚动到可视区域
// const toAboutMe = (id) => {
//     const aboutMeModule = document.getElementById(id);
//     aboutMeModule.scrollIntoView({ behavior: 'smooth' });
// };

const toArticle = (id) => {
    const articleModule = document.getElementById(id);
    articleModule.scrollIntoView({ behavior: 'smooth' });
};




</script>

<style lang="scss" scoped></style>