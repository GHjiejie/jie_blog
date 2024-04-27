<template>
    <div class="home">

        <el-row>
            <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="mobileAside">
                    <div class="Avatar">
                        <img src="https://i.ntdtv.com/assets/uploads/2023/05/id103704104-GettyImages-1429639809-crop-crop-1200x675.jpg"
                            alt="">
                    </div>
                    <div class="mobileHomeMenu">
                        <svg class="icon" aria-hidden="true" @click="clickMobileHomeMenu">
                            <use xlink:href="#icon-caidan"></use>
                        </svg>
                    </div>

                </div>
                <div class="aside">
                    <!-- 头像 -->
                    <div class="Avatar">
                        <img src="https://i.ntdtv.com/assets/uploads/2023/05/id103704104-GettyImages-1429639809-crop-crop-1200x675.jpg"
                            alt="">
                    </div>
                    <!-- 个人信息 -->
                    <div class="author">
                        <h2>Jie</h2>
                        <p>爱捣鼓的前端爱好者</p>
                    </div>
                    <!-- 导航栏 -->
                    <div class="navbar">
                        <a href="#welcomeModule">
                            <div class="welcome same active" id="welcome" ref="welcomeRef">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-huanying1"></use>
                                </svg>
                                <span>首页</span>
                            </div>
                        </a>
                        <a href="#aboutMeModule">
                            <div class="aboutMe same" id="aboutMe" ref="aboutMeRef">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-guanyuwomen"></use>
                                </svg>
                                <span>关于我</span>
                            </div>
                        </a>
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
                        <div class="media" ref="mediaRef">

                            <svg class="icon" aria-hidden="true">
                                <a href="https://github.com/GHjiejie">
                                    <use xlink:href="#icon-github"></use>
                                </a>
                            </svg>

                            <svg class="icon" aria-hidden="true">
                                <a href="https://gitee.com/Chocolate_Jie">
                                    <use xlink:href="#icon-GITEE"></use>
                                </a>
                            </svg>
                            <svg class="icon" aria-hidden="true">
                                <a href="https://blog.csdn.net/weixin_65744780?spm=1000.2115.3001.5343">
                                    <use xlink:href="#icon-csdn1"></use>
                                </a>
                            </svg>
                            <svg class="icon" aria-hidden="true">
                                <a href="https://juejin.cn/user/2166504806160336">
                                    <use xlink:href="#icon-juejin"></use>
                                </a>
                            </svg>

                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
                <div class="container" @scroll="handleScroll">
                    <div class="welcomeModule samePoint" ref="welcomeModuleRef" id="welcomeModule">
                        <Welcome @goAboutMe="toAboutMe"></Welcome>
                    </div>
                    <div class="aboutMeModule samePoint" ref="aboutMeModuleRef" id="aboutMeModule">
                        <AboutMe></AboutMe>
                    </div>
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
            </el-col>
        </el-row>

    </div>
    <el-drawer v-model="homeMenuStatus" :with-header="false" size="40%" class="HomeMenu">
        <div class="homeMenuTitle">
            <h1>菜单</h1>
        </div>
        <div class="navbar">
            <a href="#welcomeModule">
                <div class="welcome same active" id="welcome" ref="welcomeRef">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huanying1"></use>
                    </svg>
                    <span>首页</span>
                </div>
            </a>
            <a href="#aboutMeModule">
                <div class="aboutMe same" id="aboutMe" ref="aboutMeRef">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-guanyuwomen"></use>
                    </svg>
                    <span>关于我</span>
                </div>
            </a>
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
            <div class="media" ref="mediaRef">
                <svg class="icon" aria-hidden="true">
                    <a href="https://github.com/GHjiejie">
                        <use xlink:href="#icon-github"></use>
                    </a>
                </svg>

                <svg class="icon" aria-hidden="true">
                    <a href="https://gitee.com/Chocolate_Jie">
                        <use xlink:href="#icon-GITEE"></use>
                    </a>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <a href="https://blog.csdn.net/weixin_65744780?spm=1000.2115.3001.5343">
                        <use xlink:href="#icon-csdn1"></use>
                    </a>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <a href="https://juejin.cn/user/2166504806160336">
                        <use xlink:href="#icon-juejin"></use>
                    </a>
                </svg>
            </div>
        </div>
    </el-drawer>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Welcome from '../Welcome/Welcome.vue';
import AboutMe from '../AboutMe/AboutMe.vue';
import Article from '../Article/Article.vue';
import Contact from '../Contact/Contact.vue';
import Footer from '../Footer/Footer.vue';

const welcomeRef = ref(null);
const aboutMeRef = ref(null);
const articleRef = ref(null);
const contactRef = ref(null);
const aboutMeModuleRef = ref(null);
const welcomeModuleRef = ref(null);
const articleModuleRef = ref(null);
const contactModuleRef = ref(null);

const mediaRef = ref(null);

const homeMenuStatus = ref(false);

// 页面初始化
onMounted(() => {
    //   实现，获取media，实现鼠标左键按住可以实现左右滑动
    const media = mediaRef.value;
    let isDown = false;
    let startX, scrollLeft;

    media.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.clientX - media.offsetLeft;
        scrollLeft = media.scrollLeft;

        // 添加一个事件监听器，当鼠标抬起时，停止滑动
        media.addEventListener('mouseup', () => {
            isDown = false;
            media.removeEventListener('mouseup', arguments.callee);
        });

        // 添加一个事件监听器，当鼠标移出元素时，停止滑动
        media.addEventListener('mouseleave', () => {
            isDown = false;
            media.removeEventListener('mouseleave', arguments.callee);
        });
    });

    media.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.clientX - media.offsetLeft;
        media.scrollLeft = scrollLeft - (x - startX) * 3; // scroll-fast
    });

});

// 点击home菜单按钮
const clickMobileHomeMenu = () => {
    homeMenuStatus.value = true;
}
// 接受子组件传递过来的id，然后根据id获取模块的dom节点，然后调用scrollIntoView方法，让模块滚动到可视区域
const toAboutMe = (id) => {
    const aboutMeModule = document.getElementById(id);
    aboutMeModule.scrollIntoView({ behavior: 'smooth' });
};


// 监听区域的滚动事件
const handleScroll = (e) => {
    const sections = [
        { ref: welcomeModuleRef, navRef: welcomeRef },
        { ref: aboutMeModuleRef, navRef: aboutMeRef },
        { ref: articleModuleRef, navRef: articleRef },
        { ref: contactModuleRef, navRef: contactRef }
    ];
    // console.log(sections);

    const scrollOffset = e.target.scrollTop;


    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        // 获取模块的顶部和底部
        // 获取模块距离父盒子的顶部的距离
        const sectionTop = section.ref.value.offsetTop;
        // 获取模块底部距离父盒子顶部的距离
        const sectionBottom = sectionTop + section.ref.value.offsetHeight; //这个长度实际是当前模块底部距离盒子顶部的距离，也是下一个模块顶部距离盒子顶部的距离
        if (scrollOffset > sectionTop - 50 && scrollOffset < sectionBottom - 50) {
            section.navRef.value.classList.add('active');
        } else {
            section.navRef.value.classList.remove('active');
        }
    }
}



</script>
<style lang="scss" scoped>
.home {
    overflow: hidden;

    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    .aside {
        background-color: rgb(255, 255, 255);
        border-right: 1px solid #00000024;

        height: 100vh;

        .Avatar {
            padding-top: 3rem;
            display: flex;
            justify-content: center;

            img {
                width: 8rem;
                height: 8rem;
                border-radius: 50%;
                object-fit: cover;

                &:hover {
                    cursor: pointer;
                }
            }

        }

        .author {
            padding-top: 0.5rem;
            text-align: center;
            color: #000000;

            h2 {
                font-size: 1.5rem;
                padding-bottom: 0.3rem;
            }

            p {
                font-size: 1rem;
            }
        }


    }

    .container {
        // background-color: rgb(255, 0, 0);
        height: 100vh;
        overflow: auto;



    }

    // aside需要使用媒体查询
    @media screen and (max-width: 768px) {
        .aside {
            display: none;
        }

        .container {
            height: 90vh;
        }
    }
}

.HomeMenu {


    .homeMenuTitle {
        text-align: center;
        padding: 1rem 0;
        border-bottom: 1px solid #00000024;

        h1 {
            font-size: 1.5rem;
            color: #000000;
        }
    }
}

.navbar {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    a {
        text-decoration: none;
    }

    .same {
        text-align: center;
        color: #000000;
        font-size: 1rem;
        padding: 1rem 0;
        font-weight: bold;
        transition: all 0.3s ease-in-out;

        span {
            padding-left: 0.8rem;
        }
    }

    .media {
        text-align: center;
        width: 100%;
        white-space: nowrap;
        overflow-x: auto;
        box-sizing: border-box;
        // background-color: red;
        // margin: 0 auto;


        svg {
            padding: 2rem 1rem;
            font-size: 1.2rem;
        }

        &:hover {
            cursor: pointer;
        }
    }

    .same:hover {
        background-color: #77777846;
    }

    .active {
        background-color: #e5e7ea46;
    }
}

.mobileAside {
    display: none;
}

// 在移动端下的样式

@media screen and (max-width: 768px) {
    .mobileAside {
        height: 10vh;
        display: flex;
        justify-content: space-between;
        padding: 0 1.5rem;
        align-items: center;
        background-color: rgb(0, 0, 0);

        .Avatar {
            display: flex;
            justify-content: center;

            img {
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 50%;
                object-fit: cover;

                &:hover {
                    cursor: pointer;
                }
            }

        }

        .mobileHomeMenu {

            svg {
                font-size: 2rem;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
