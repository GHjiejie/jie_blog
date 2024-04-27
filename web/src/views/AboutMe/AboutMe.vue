<template>
    <div class="aboutMe">
        <div class="title">
            <span>关于我</span>
        </div>
        <div class="introduce">
            <span>爱折腾的大学生</span>
        </div>
        <div class="categorySelect">
            <ul>
                <li v-for="(item, index) in myLifeCategoryList" @click="selected(item.categoryName, index)"
                    :style="activeIndex === index ? 'color:#409EFF' : ''" :key="item._id">{{
                        item.categoryName }}</li>
            </ul>
        </div>
        <div class="showImgBox">
            <!-- <template v-if="firstLoadStatus">
                <img src="../../assets/images/stickman-8560_256.gif" alt="" class="firstGif" ref="GifRef">
            </template> -->
            <!-- <template v-else> -->
            <div v-for="(item, index) in imgLists" :key="item._id" class="animationImg imgItemBox">

                <div class="imgCard">
                    <div class="front">
                        <img :src="item.lifeImg" alt="" @click="turnover(index, item)" :data=index ref="currentImgRef">
                    </div>
                    <!-- <div class="back">
                        <div class="desc">{{ item }}</div>
                    </div> -->
                </div>

             </div>
            <!-- </template> -->



        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
const myLifeCategoryList = ref({});

const imgLists = ref({});
const activeIndex = ref(0);
// const staticPath = 'http://localhost';

// const firstLoadStatus = ref(true);

const currentImgRef = ref(null);


// 根据用户选择的类别，展示对应的图片
const selected = async (item, index) => {
    // firstLoadStatus.value = false;
    // console.log(item);
    activeIndex.value = index;
    await getImgs(item);
}

const getImgs = async (category) => {
    const res = await axios({
        method: 'get',
        url: `/web/mylifeimg/category/${category}`,
    });
    if (res.status === 200) {
        imgLists.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: '图片类别获取失败'
        });

    }
}
// 页面初始化
onMounted(async () => {
    // 获取当前页面的高度
    // console.log(document.documentElement.clientHeight);607
    const res = await axios({
        method: 'get',
        url: '/web/mylifeimgcategory',
    });
    if (res.status === 200) {
        myLifeCategoryList.value = res.data;
    } else {
        ElMessage({
            type: 'error',
            message: '图片类别获取失败'
        });
    }
    await getImgs(myLifeCategoryList.value[0].categoryName);

});
</script>
<style scoped>
::-webkit-scrollbar {
    width: 0;
    height: 0;

}
</style>
<style scoped lang="scss">
.aboutMe {
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 0;
    margin-bottom: 3rem;


    .title {
        font-size: 3rem;

    }

    .introduce {
        font-size: 0.8rem;
        letter-spacing: 1rem;
        padding-top: 0.5rem;
        margin: 1rem 0;
    }
}

.categorySelect {
    ul {
        margin-top: 1rem;
        display: flex;


        li {
            list-style: none;
            padding: 0 2rem;

            &:hover {
                cursor: pointer;
                color: #409EFF;
            }


        }
    }
}

.showImgBox {
    height: 50vh;
    // 设置最大高度
    max-height: 80vh;

    overflow: auto;
    width: 90%;
    margin: 1.5rem auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .firstGif {
        width: 15rem;
        height: 15rem;

    }



    .imgItemBox {
        width: 15rem;
        height: auto;
        margin: 1rem 0;
        overflow: hidden;

        .imgCard {
            width: 15rem;
            height: 15rem;
            position: relative;
            transform-style: preserve-3d;

            // 隐藏背面
            backface-visibility: hidden;
            // transition: all 0.5s ease-in-out;

            .front {
                position: absolute;
                width: 15rem;
                height: 15rem;
                backface-visibility: hidden;
                // z-index: 2;

                /* 隐藏背面内容 */
                img {
                    box-sizing: border-box;
                    width: 15rem;
                    height: 15rem;
                    border: 1px solid #ffffff;
                    object-fit: cover;
                    // border: 2px solid #409EFF;
                    // overflow: hidden;
                    transition: all 0.5s ease-in-out;
                    //    设置过渡原点
                    transform-origin: center center;

                    &:hover {
                        cursor: pointer;
                        transform: scale(1.1);
                    }
                }
            }

            // .back {
            //     position: absolute;
            //     width: 15rem;
            //     height: 15rem;
            //     backface-visibility: hidden;
            //     /* 隐藏背面内容 */

            //     .desc {
            //         width: 15rem;
            //         height: 15rem;
            //         display: flex;
            //         align-items: center;
            //         justify-content: center;
            //         font-size: 1.5rem;

            //     }
            // }
            // transition: all 0.5s ease-in-out;
        }
    }
}


.animationImg {
    animation: fade 0.6s ease-in-out;

    @keyframes fade {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }

    }

}
</style>
              
       