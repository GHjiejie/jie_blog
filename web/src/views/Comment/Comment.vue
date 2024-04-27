<template>
    <div class="comment">
        <div class="commentNav">
            <span class="title">评论</span>
            <span class="newest">最新</span>
            <span class="interval">|</span>
            <span class="hot">最热</span>
        </div>

        <div class="publish">
            <!-- 这个里面应该是现在登录用户的身份信息，我们后面会将这个数据从数据库里面取出来 -->

            <!-- 当前用户的头像 -->
            <div class="avatar">
                <img src="https://p1.itc.cn/q_70/images03/20230713/dfb550d839904bd7b63a06ac01cf6292.jpeg" alt="">
            </div>
            <!-- 当前用户评论的盒子 -->
            <div class="commmentBox">
                <input type="text" placeholder="年轻人，留下你的评论再走也不迟啊">
                <button class="publishBtn" @click="checkLogin">发表评论</button>
            </div>
        </div>

        <div class="commentList">
            <div class="avatar">
                <img src="https://i.ntdtv.com/assets/uploads/2023/05/id103704104-GettyImages-1429639809-crop-crop-1200x675.jpg"
                    alt="">
            </div>
            <div class="content">
                <div class="contentTop">
                    <div class="name">张三</div>
                    <div class="about">
                        <div class="time"> 2021-10-10 </div>
                        <div class="address">IP属地:安徽</div>
                        <div class="reply" @click="reply">回复</div>
                    </div>
                </div>

                <div class="contentBottom">
                    <div class="commentDetail">这个是评论的详说过的覅疯狗食宿，sidfgib怪不哈到家开挂机尕布发的举报第九就很舒服广
                        ib怪不哈到家开挂机尕布发的举报第九就很舒服广
                        ib怪不哈到家开挂机尕布发的举报第九就很舒服广播v你还是个超级减肥的GV波就
                    </div>

                    <!-- 点击回复按钮后，下面的盒子就会出现 -->
                    <template v-if="replyStatus">
                        <div class="replyMoudle">
                            <div class="userAvatar">
                                <img src="https://p1.itc.cn/q_70/images03/20230713/dfb550d839904bd7b63a06ac01cf6292.jpeg"
                                    alt="">
                            </div>
                            <div class="commmentBox">

                                <input type="text" placeholder="年轻人，留下你的评论再走也不迟啊" ref="replyInput">

                                <button class="replyBtn" @click="submitReply">发表评论</button>
                            </div>
                        </div>
                    </template>

                    <!-- 下面将回复的内容展示在这里 -->
                    <template v-if="replyBoxStatus">
                        <div class="replyDetailBox">
                            <ul>
                                <li v-for="item in replyContent">{{ item }}</li>
                            </ul>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const replyStatus = ref(false);
const replyInput = ref('');
let replyContent = ref([]);

// 界面初始化，从数据库里面取出当前用户的数据
onMounted(() => {
    console.log(replyInput.value);
});

// 检查用户是否登录
const checkLogin = () => {
    console.log('检查用户是否登录');
}

// 定义展示回复内容的盒子
const replyBoxStatus = ref(false);

// 点击回复
const reply = () => {
    replyStatus.value = !replyStatus.value;
}

// 提交回复的内容
const submitReply = () => {
    // 将数据推到数组里面
    replyContent.value.push(replyInput.value.value);
    console.log(replyContent.value);
    // console.log(replyInput.value.value);
    replyStatus.value = false;
    replyBoxStatus.value = true;
}
</script>

<style lang="scss" scoped>
.comment {
    box-sizing: border-box;
    width: 80vw;
    padding: 1.5rem 2.5rem;
    background-color: rgb(255, 255, 255);

    .commentNav {
        padding-bottom: 2rem;
        // background-color: black;

        .title {
            font-size: 2rem;
            color: #000000;
            margin-bottom: 2rem;
            font-weight: bolder;
            // text-align: center;
            font-style: italic;
            text-shadow: 2px 5px 5px rgba(255, 255, 255, 0.638);
        }

        .newest {
            padding-left: 3rem;

            &:hover {
                color: blue;
                cursor: pointer;
            }
        }

        .interval {
            padding: 0 0.5rem;
        }

        .hot {
            &:hover {
                color: blue;
                cursor: pointer;
            }
        }
    }

    .publish {
        display: flex;
        margin-bottom: 2rem;

        .avatar {
            img {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                object-fit: cover;
            }
        }

        .commmentBox {
            margin-left: 1rem;
            display: flex;
            // flex-direction: column;
            justify-content: space-between;
            width: 100%;

            input {
                width: 80%;
                height: 3rem;
                border-radius: 0.5rem;
                background-color: #b4b4b42f;
                border: 1px solid #77777728;
                padding: 0 1rem;
                outline: none;
                overflow: auto;
            }
        }

        .publishBtn {
            width: 10%;
            // padding: 0 1rem;
            height: 3rem;
            color: #000000;
            font-size: 0.8rem;
            font-weight: bolder;
            border-radius: 0.5rem;
            border: none;
            transition: all 0.3s ease-in-out;

            &:hover {
                background-color: deepskyblue;
                cursor: pointer;
            }
        }
    }


    .commentList {
        display: flex;

        .avatar {

            img {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                object-fit: cover;
            }
        }

        .content {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;

            .contentTop {
                display: flex;
                flex-direction: column;

                .name {
                    font-size: 1rem;
                    color: #ff0000;
                }

                .about {
                    margin-top: 0.5rem;
                    display: flex;

                    .time {
                        font-size: 0.6rem;
                        color: #777777;
                    }

                    .address {
                        font-size: 0.6rem;
                        color: #777777;
                        margin-left: 1rem;
                    }

                    .reply {
                        font-size: 0.6rem;
                        color: #777777;
                        margin-left: 1rem;
                        cursor: pointer;

                        &:hover {
                            color: blue;
                        }
                    }
                }

            }

            .contentBottom {
                margin-top: 0.5rem;

                .commentDetail {
                    font-size: 1rem;
                    color: #000000;
                }

                .replyMoudle {

                    display: flex;
                    margin: 2rem 0;

                    .userAvatar {
                        img {
                            width: 3rem;
                            height: 3rem;
                            border-radius: 50%;
                            object-fit: cover;
                        }
                    }

                    .commmentBox {
                        margin-left: 1rem;
                        display: flex;
                        // flex-direction: column;
                        justify-content: space-between;
                        width: 100%;

                        input {
                            width: 80%;
                            height: 3rem;
                            border-radius: 0.5rem;
                            background-color: #b4b4b42f;
                            border: 1px solid #77777728;
                            padding: 0 1rem;
                            outline: none;
                            overflow: auto;
                        }
                    }

                    .replyBtn {
                        width: 10%;
                        // padding: 0 1rem;
                        height: 3rem;
                        color: #000000;
                        font-size: 0.8rem;
                        font-weight: bolder;
                        border-radius: 0.5rem;
                        border: none;
                        transition: all 0.3s ease-in-out;

                        &:hover {
                            background-color: deepskyblue;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

}

.replyDetailBox {
    width: 100%;
    height: 10rem;
    background-color: #b4b4b42f;
    border-radius: 0.5rem;
    margin-top: 1rem;
}
</style>