<template>
    <div class="life">
        <div class="title">生活照片墙</div>
        <div class="categorySelect">
            <ul>
                <li v-for="(item, index) in myLifeCategoryList" @click="selected(item.categoryName, index)"
                    :style="activeIndex === index ? 'color:#409EFF' : ''" :key="item._id">{{
                        item.categoryName }}</li>
            </ul>
        </div>
        <!-- 根据按钮选择的分类，展示对应的图片 -->

    </div>
    <!-- <div class="showImgBox">
        <div v-for="item in imgLists" :key="item._id" :class="getRandomAnimationClass()">
            <img :src="staticPath + item.lifeImg" alt="">
        </div>
    </div> -->

    <div class="showImgBox">
        <div v-for="item in imgLists" :key="item._id" class="animationImg">
            <img :src="item.lifeImg" alt="" @click="editImg(item)">
        </div>
    </div>

    <el-dialog v-model="currentImgInfo.dialogVisible" title="编辑照片" width="500" draggable>
        <div class="editImgBox">
            <div class="showImg">
                <template v-if="selectedImgStatus">
                    <img :src="currentImgInfo.lifeImg" alt="" class="editImgAnimation">
                </template>
                <template v-else>
                    <img :src="NewSelectedImgPath" alt="" class="editImgAnimation">
                </template>
                <el-button type="info" @click="updateImg" class="updateBtn">更换图片</el-button>
                <input type="file" class="updateImg" ref="updateImgRef">
            </div>
            <div class="operation">
                <el-form label-width="120px">

                    <el-form-item label="更新类别">
                        <el-select v-model="currentImgInfo.category" placeholder="选择照片所属的类别">
                            <el-option :label=item.categoryName v-for=" item in myLifeCategoryList" :value=item />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="更新图片描述">
                        <el-input v-model="currentImgInfo.discription" type="textarea" />
                    </el-form-item>



                    <el-form-item>
                        <el-button type="danger" @click="deleteImg">删除</el-button>
                        <el-button type="primary" @click="onSubmitUpdete">修改</el-button>

                    </el-form-item>
                </el-form>
            </div>


        </div>
        <!-- <template #footer>

            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    Confirm
                </el-button>
            </div>
        </template> -->
    </el-dialog>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
const myLifeCategoryList = ref({});

const imgLists = ref({});
const activeIndex = ref(0);

const updateImgRef = ref(null);

const selectedImgStatus = ref(true);

const NewSelectedImgPath = ref('');

const currentImgInfo = reactive({
    _id: '',
    dialogVisible: false,
    category: '',
    lifeImg: '',
    discription: '',
});


// 删除图片

const deleteImg = async () => {
    const res = await axios({
        method: 'delete',
        url: `/api/mylifeimg/${currentImgInfo._id}`,
    });
    if (res.status === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        currentImgInfo.dialogVisible = false;
        await getImgs(currentImgInfo.category);
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        });
    }
}
// 更新图片按钮
const updateImg = () => {
    updateImgRef.value.click();
    updateImgRef.value.onchange = (e) => {
        selectedImgStatus.value = false;
        const file = e.target.files[0];
        NewSelectedImgPath.value = URL.createObjectURL(file);
    }

}

// 提交更新
const onSubmitUpdete = async () => {
    console.log(currentImgInfo);

    const res = await axios({
        method: 'put',
        url: `/api/mylifeimg/${currentImgInfo._id}`,
        data: {
            category: currentImgInfo.category,
            discription: currentImgInfo.discription,
            updateImgFile: updateImgRef.value.files[0],
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    if (res.status === 200) {
        ElMessage({
            type: 'success',
            message: '更新成功'
        });
        console.log(res.data);
        currentImgInfo.dialogVisible = false;
        // await getImgs(currentImgInfo.category);
    } else {
        ElMessage({
            type: 'error',
            message: '更新失败'
        });
    }

}
// 编辑照片
const editImg = (item) => {

    selectedImgStatus.value = true;

    currentImgInfo._id = item._id;
    currentImgInfo.lifeImg = item.lifeImg;
    currentImgInfo.category = item.category;
    currentImgInfo.discription = item.discription;
    currentImgInfo.dialogVisible = true;
}

// 定义动画类名数组
// const animationNames = ['bounce', 'fade', 'slide', 'zoom'];

// 图片元素获取随机动画类名
// const getRandomAnimationClass = () => {
//     const index = Math.floor(Math.random() * animationNames.length);
//     return animationNames[index];
// };


// 根据用户选择的类别，展示对应的图片
const selected = async (item, index) => {
    // console.log(item);
    activeIndex.value = index;
    await getImgs(item);
}

const getImgs = async (category) => {
    const res = await axios({
        method: 'get',
        url: `/api/mylifeimg/category/${category}`,
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
    const res = await axios({
        method: 'get',
        url: '/api/mylifeimgcategory',
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
<style scoped lang="scss">
.life {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-size: 2rem;
        font-weight: bolder;
        padding: 0 0 2rem;
    }

    .categorySelect {
        ul {
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
}

.showImgBox {
    height: auto;
    width: 90%;
    margin: 1.5rem auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    div {
        width: 15rem;
        height: 15rem;
        margin: 1rem 0;
        overflow: hidden;


        img {

            width: 100%;
            height: 100%;
            object-fit: cover;
            border: 2px solid #409EFF;
            // overflow: hidden;
            transition: all 0.5s ease-in-out;
            //    设置过渡原点
            transform-origin: center center;

            &:hover {
                cursor: pointer;
                transform: scale(1.1);
                border: 2px solid #001ac5;
            }
        }

    }



}

.editImgBox {
    // background-color: rgb(205, 192, 192);
    display: flex;

    .showImg {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 12rem;
        height: 12rem;
        overflow: hidden;

        img {
            width: 8rem;
            height: 8rem;
            object-fit: cover;
            margin-bottom: 1rem;


            &:hover {
                cursor: pointer;

            }
        }

        .editImgAnimation {
            animation: fade 0.5s ease-in-out;

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

        .updateBtn {
            background-color: black;
            color: white;
            transition: all 0.3s ease-in-out;
            font-size: 0.5rem;
            padding: 0.3rem 0.5rem;

            &:hover {
                background-color: skyblue;
                color: rgb(0, 0, 0);
            }
        }

        .updateImg {
            display: none;
        }

    }

    .operation {

        display: flex;
        flex-direction: column;
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

// .bounce {
//     animation: bounce 1s ease-in-out;

//     @keyframes bounce {
//         0% {
//             transform: translateY(0);
//         }

//         50% {
//             transform: translateY(-10px);
//         }

//         100% {
//             transform: translateY(0);
//         }

//     }
// }

// .fade {
//     animation: fade 1s ease-in-out;

//     @keyframes fade {
//         0% {
//             opacity: 0;
//         }

//         50% {
//             opacity: 0.5;
//         }

//         100% {
//             opacity: 1;
//         }

//     }
// }

// .slide {
//     animation: slide 1s ease-in-out;

//     @keyframes slide {
//         0% {
//             transform: translateX(0);
//         }

//         50% {
//             transform: translateX(-50px);
//         }

//         100% {
//             transform: translateX(0);
//         }

//     }
// }

// .zoom {
//     animation: zoom 1s ease-in-out;

//     @keyframes zoom {
//         0% {
//             transform: scale(1);
//         }

//         50% {
//             transform: scale(1.1);
//         }

//         100% {
//             transform: scale(1);
//         }

//     }
// }
</style>