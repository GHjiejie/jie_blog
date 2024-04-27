<template>
    <div class="welcome">
        <main>
            <h1>人生如逆旅，我亦是行人</h1>
            <p>你好，我是Jie</p>
            <button @click="clickAboutMe">关于我</button>
        </main>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['goAboutMe']);
const clickAboutMe = () => {
    emit('goAboutMe', 'aboutMeModule');
};
</script>

<style lang="scss" scoped>
.welcome {
    height: 100vh;
    background: url(https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
    }

    main {
        text-align: center;
        z-index: 1;

        h1 {
            font-size: 2rem;
            padding-bottom: 1rem;
            color: #fff;
            /* 修改标题颜色为白色 */
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            /* 设置字体 */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            /* 添加文字阴影 */
        }

        p {
            font-size: 1.3rem;
            /* 提高段落字体大小 */
            padding-bottom: 1.5rem;
            color: #ddd;
            /* 修改段落颜色为浅灰色 */
        }

        button {
            background-color: #c99494;
            /* 按钮背景颜色 */
            color: #fff;
            /* 按钮文字颜色 */
            padding: 10px 20px;
            font-size: 1rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            /* 添加过渡效果 */
        }

        button:hover {
            background-color: #a35f5f;
            color: #d8c7c7;

            /* 悬停时的背景颜色 */
        }
    }
}
</style>
