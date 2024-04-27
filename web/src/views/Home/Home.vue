<template>
    <div class="home" ref="homeRef">
        <el-container>
            <el-header>
                <HomeNavbar />
            </el-header>
            <el-main>
                <HomeMain />
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import HomeNavbar from './HomeNavbar.vue';
import HomeMain from './HomeMain.vue';
import { ref, onMounted } from 'vue';
const homeRef = ref(null);
const animationList = ['fadeIn', 'fadeInDown', 'fadeInUp', 'fadeInLeft', 'fadeInRight'];


// 页面初始化
onMounted(() => {
    homeRef.value.classList.add(randomAnimation());
});

// 获取随机动画
const randomAnimation = () => {
    const index = Math.floor(Math.random() * animationList.length);
    return animationList[index];
}
</script>

<!-- PC端 -->
<style scoped lang="scss">
.home {
    overflow: hidden;

}

.fadeIn {
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
}

.fadeInDown {
    animation: fadeInDown 0.5s ease-in-out;

    @keyframes fadeInDown {
        0% {
            transform: translateY(-100%);
            opacity: 0;
        }

        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
}

.fadeInUp {
    animation: fadeInUp 0.5s ease-in-out;

    @keyframes fadeInUp {
        0% {
            transform: translateY(100%);
            opacity: 0;
        }

        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
}

.fadeInLeft {
    animation: fadeInLeft 0.5s ease-in-out;

    @keyframes fadeInLeft {
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

.fadeInRight {
    animation: fadeInRight 0.5s ease-in-out;

    @keyframes fadeInRight {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }

        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
}

.el-header {
    // box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.el-main {
    padding: 0;
    margin: 0;
}
</style>
