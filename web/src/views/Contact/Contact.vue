<template>
    <div class="contact">
        <div class="mask">
            <div class="contactMeTitle">
                <div class="title">
                    <img src="../../assets/images/to-write-6621_256.gif" alt="">
                    <span>反馈意见</span>
                </div>
                <p>去留无意，闲看庭前花开花落；宠辱不惊，漫随天外云卷云舒。 </p>

                <p class="sushi">---《小窗幽记·集景篇》</p>
            </div>

            <div class="aboutmeBox">
                <!-- <div class="title"></div> -->
                <div class="contactForm">
                    <label for="name"></label>
                    <input type="text" class="name" placeholder="姓名" v-model="contactFormData.name">
                    <label for="email"></label>
                    <input type="text" class="email" placeholder="邮箱" v-model="contactFormData.email">
                    <label for="feedback"></label>
                    <textarea name="feedback" class="feedback" cols="30" rows="10" placeholder="反馈意见"
                        v-model="contactFormData.feedback"> </textarea>
                    <el-button type="primary" class="submitBtn" @click="submitFeedBack">提交</el-button>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
const contactFormData = ref({
    name: '',
    email: '',
    feedback: '',
    time: new Date().toLocaleString(),
});

const submitFeedBack = async () => {
    if (!contactFormData.value.name || !contactFormData.value.email || !contactFormData.value.feedback) {
        ElMessage({
            message: '请填写完整信息',
            type: 'error',
        })
        return;
    }
    // console.log(contactFormData);
    const res = await axios.post('/web/contact', contactFormData.value);
    if (res.data.code === 200) {
        // 清空表单
        contactFormData.value = {
            name: '',
            email: '',
            feedback: '',
        }
        ElMessage({
            message: '提交成功,请等待作者的回复哦',
            type: 'success',
        })
    }
    else {
        ElMessage({
            message: '提交失败，请稍后再试',
            type: 'error',
        })
    }
}
</script>

<!-- PC端样式 -->
<style lang="scss" scoped>
.mask {
    background: -webkit-linear-gradient(top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.73) 17%,
            rgba(0, 0, 0, 0.66) 35%,
            rgba(0, 0, 0, 0.55) 62%,
            rgba(0, 0, 0, 0.4) 100%);
    background-attachment: fixed;
}

.contact {
    overflow: hidden;
    background: url(../../assets/images/contactMe.jpeg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;

    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    .contactMeTitle {
        text-align: center;
        padding: 5rem 5rem 2rem;

        .title {
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 2rem;
                height: 2rem;
                margin-right: 0.5rem;
            }

            span {
                color: #7b6a6a;
                font-size: 2rem;
                font-weight: bold;
            }
        }



        p {
            padding: 1rem;
            font-size: 0.8rem;
            color: rgba(171, 165, 122, 0.764);
        }

        .sushi {
            position: relative;
            left: 24%;
        }
    }

    .aboutmeBox {
        padding-bottom: 5rem;
        display: flex;
        justify-content: center;

        .contactForm {
            width: 45%;

            input,
            textarea {
                box-sizing: border-box;
                width: 100%;
                border-radius: 2rem;
                border: 1px solid #736b6b;
                background-color: rgba(215, 201, 201, 0.25);
                color: #ffffff;
                font-size: 1rem;
                padding: 1rem;
                margin-bottom: 2.5rem;
                outline: none;
                transition: all 0.3s ease-in-out;

                &::placeholder {
                    color: #dddddd;
                    font-style: italic;
                }

                &:hover {
                    border: 1px solid #00d5ff;
                }
            }

            textarea {
                height: 10rem;
            }

            .submitBtn {
                border: none;
                width: 80%;
                display: flex;
                justify-content: center;
                margin: 0 auto;
                background-color: #dddddd;
                color: rgb(0, 0, 0);
                padding: 0.8rem 0;
                border-radius: 3rem;
                font-size: 0.8rem;
                font-weight: bold;
                transition: all 0.3s ease-in-out;

                &:hover {
                    background-color: rgb(0, 0, 0);
                    color: white;
                }
            }
        }
    }
}
</style>

<!-- 移动端样式 -->
<style lang="scss"scoped>
@media (max-width: 768px) {
    .contact {
        .mask {
            background: -webkit-linear-gradient(top,
                    rgba(0, 0, 0, 0.8) 0%,
                    rgba(0, 0, 0, 0.73) 17%,
                    rgba(0, 0, 0, 0.66) 35%,
                    rgba(0, 0, 0, 0.55) 62%,
                    rgba(0, 0, 0, 0.4) 100%);
            background-attachment: fixed;
        }

        .contactMeTitle {
            text-align: center;
            padding: 5rem 5rem 2rem;

            .title {
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 2rem;
                    height: 2rem;
                    margin-right: 0.5rem;
                }

                span {
                    color: #7b6a6a;
                    font-size: 2rem;
                    font-weight: bold;
                }
            }

            p {
                padding: 1rem;
                font-size: 0.8rem;
                color: rgba(171, 165, 122, 0.764);
            }

            .sushi {
                position: relative;
                left: 24%;
            }
        }

        .aboutmeBox {
            padding-bottom: 5rem;
            display: flex;
            justify-content: center;

            .contactForm {
                width: 80%;

                input,
                textarea {
                    box-sizing: border-box;
                    width: 100%;
                    border-radius: 2rem;
                    border: 1px solid #736b6b;
                    background-color: rgba(215, 201, 201, 0.25);
                    color: #ffffff;
                    font-size: 1rem;
                    padding: 1rem;
                    margin-bottom: 2.5rem;
                    outline: none;
                    transition: all 0.3s ease-in-out;

                    &::placeholder {
                        color: #dddddd;
                        font-style: italic;
                    }

                    &:hover {
                        border: 1px solid #00d5ff;
                    }
                }

                textarea {
                    height: 10rem;
                }
            }
        }

        .submitBtn {
            border: none;
            width: 80%;
            display: flex;
            justify-content: center;
            margin: 0 auto;
            background-color: #dddddd;
            color: rgb(0, 0, 0);
            padding: 0.8rem 0;
            border-radius: 3rem;
            font-size: 0.8rem;
            font-weight: bold;
            transition: all 0.3s ease-in-out;

            &:hover {
                background-color: rgb(0, 0, 0);
                color: white;
            }
        }

    }
}
</style>