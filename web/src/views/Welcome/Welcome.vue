<template>
    <div class="welcome">
        <main>
            <span>人生如逆旅，我亦是行人</span>
            <p>你好，我是Jie</p>
            <!-- <button @click="clickAboutMe"><span>开始探索</span></button> -->
            <button @click="clickArticle"><span>开始探索</span></button>
        </main>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['goAboutMe']);
// const clickAboutMe = () => {
//     emit('goAboutMe', 'aboutMeModule');
// };

const clickArticle = () => {
    emit('goArticle', 'articleModule');
};
</script>

<!-- PC端样式 -->
<style lang="scss" scoped>
.welcome {
    height: 100vh;
    background: url(../../assets/images/angry-2498_256.gif);
    background-size: contain;
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

        span {
            font-size: 2rem;
            padding-bottom: 1rem;
            font-weight: bold;
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
            color: #000000;
            /* 按钮文字颜色 */
            padding: 0.5rem;
            font-size: 1rem;
            margin-top: 2rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;

            span {
                font-size: 0.8rem;
                font-weight: bold;
            }

            /* 添加过渡效果 */
        }

        button:hover {
            background-color: #000000;
            color: #ffffff;

            /* 悬停时的背景颜色 */
        }
    }
}
</style>

<!-- 移动端样式 -->
<style lang="scss" scoped>
.welcome {
    height: 100vh;
    background: url(../../assets/images/angry-2498_256.gif);
    background-size: contain;
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

        span {
            font-size: 1.5rem;
            padding-bottom: 1rem;
            font-weight: bold;
            color: #fff;
            /* 修改标题颜色为白色 */
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            /* 设置字体 */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            /* 添加文字阴影 */
        }

        p {
            font-size: 1rem;
            /* 提高段落字体大小 */
            padding: 1.5rem;
            color: #ddd;
            /* 修改段落颜色为浅灰色 */
        }

        button {
            background-color: #c99494;
            /* 按钮背景颜色 */
            color: #000000;
            /* 按钮文字颜色 */
            padding: 0.5rem;
            font-size: 0.8rem;
            margin-top: 2rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;

            span {
                font-size: 0.8rem;
                font-weight: bold;
            }

            /* 添加过渡效果 */
        }

        button:hover {
            background-color: #000000;
            color: #ffffff;

            /* 悬停时的背景颜色 */
        }
    }
}
</style>

