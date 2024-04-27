<template>
    <div class="homeNavbar">

        <div class="navbar">
            <div class="avatar" @click="showMe">
                <img src="../../assets/images/Snipaste_2023-11-28_00-45-05.jpg" alt="">
            </div>
            <div class="navbarItem">
                <a href="#welcomeModule">
                    <div class="welcome same active" id="welcome" ref="welcomeRef">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-huanying1"></use>
                        </svg>
                        <span>首页</span>
                    </div>
                </a>
                <!-- <a href="#aboutMeModule">
                    <div class="aboutMe same" id="aboutMe" ref="aboutMeRef">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanyuwomen"></use>
                        </svg>
                        <span>关于我</span>
                    </div>
                </a> -->
                <a href="#articleModule">
                    <div class="article same" id="article" ref="articleRef">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-wenzhang"></use>
                        </svg>
                        <span>文章</span>
                    </div>
                </a>
                <a href="#contactModule">
                    <div class="contact same" id="contact" ref="contactRef">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yonghufankui"></use>
                        </svg>
                        <span>联系我</span>
                    </div>
                </a>


            </div>
            <!-- <div class="join">
                <el-button type="primary" class="joinBtn" @click="joinMe"><span>加入</span></el-button>
            </div> -->
        </div>
    </div>
    <!-- <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <JoinMe />
    </el-drawer> -->
</template>

<script setup>
import { ref } from 'vue';
// import JoinMe from './JoinMe.vue';

const drawer = ref(false);
const joinMe = () => {
    drawer.value = true;
}
</script>

<!-- PC端样式 -->
<style lang="scss" scoped>
.homeNavbar {
    width: 100vw;
    position: fixed;
    top: 0;
    background-color: rgb(0, 0, 0);
    z-index: 999;
    border-bottom: 1px solid rgb(232, 224, 224);
    overflow: hidden;

    .navbar {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 1.5rem;

        .avatar {
            position: relative;
            /* Added for positioning the overlay */
            width: 3rem;
            height: 3rem;
            border-radius: 50%;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
            }

            &:hover {
                cursor: pointer;
            }

            &:after {
                content: "Jie";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                color: rgb(226, 202, 202);
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.5);
                /* Semi-transparent black overlay */
                border-radius: 50%;
                opacity: 0;
                transition: opacity 0.3s ease;
                /* Smooth transition */
            }

            &:hover:after {
                opacity: 1;
                /* Show the overlay on hover */
            }
        }

        // Remaining styles...
        .navbarItem {
            display: flex;
            align-items: center;
            margin: 0 auto;

            a {
                text-decoration: none;

                div {
                    // background-color: red;
                    padding: 0.5rem 1rem;
                    color: rgb(216, 168, 168);
                    font-size: 0.8rem;
                    transition: all 0.3s ease-in-out;

                    &:hover {
                        background-color: rgba(255, 255, 255, 0.548);
                        border-radius: 2rem;
                        color: white;

                    }

                    span {
                        padding-left: 0.5rem;

                    }
                }
            }
        }

        .join {
            display: flex;
            align-items: center;

            .joinBtn {
                box-sizing: border-box;
                padding: 0.5rem;
                background-color: rgb(255, 255, 255);
                transition: all 0.3s ease-in-out;

                span {
                    color: black;
                    font-size: 0.8rem;
                    font-weight: bold;
                    padding: 0.5rem;
                }

                &:hover {
                    background-color: rgb(0, 0, 0);

                    span {
                        color: white;
                    }
                }
            }
        }

    }
}
</style>
<!-- 移动端样式 -->
<style lang="scss" scoped>
@media (max-width: 768px) {
    .homeNavbar {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        height: 60px;

        .navbar {
            width: 100%;
            padding: 0.5rem 1rem;

            .avatar {
                width: 2rem;
                height: 2rem;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }

            .navbarItem {
                a {
                    div {
                        padding: 0.5rem 0.5rem;
                        font-size: 0.85rem;
                    }
                }
            }

            .join {
                .joinBtn {
                    span {
                        font-size: 1rem;
                    }
                }
            }
        }
    }
}
</style>