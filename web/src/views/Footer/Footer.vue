<template>
    <div class="footer">
        <div class="footer-content">
            <div class="tech">
                <h3>技术说明</h3>
                <p>个人网站，基于 Vue.js 和 Vite 构建</p>
                <p>部署于阿里云服务器</p>
                <p>使用 SCSS 进行样式设计</p>
            </div>

            <div class="contact">
                <h3>联系方式</h3>
                <p>Email: 3426571530@qq.com</p>
                <p>Phone: 18196576670</p>
            </div>

            <div class="media">
                <h3>社交媒体</h3>
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

        <div class="copyright">
            &copy; 2024 Jie. All rights reserved.
        </div>
    </div>
</template>

<script setup>
</script>
<!-- PC端样式 -->
<style lang="scss" scoped>
.footer {
    background-color: rgb(0, 0, 0);
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;

    .footer-content {
        padding: 1rem;
        width: 100%;
        // background-color: green;
        display: flex;
        justify-content: space-around;

        .tech,
        .contact {
            h3 {
                font-size: 1.5rem;
                color: white;
                margin-bottom: 0.8rem;
                font-style: italic;
            }

            p {
                font-size: 0.8rem;
                color: rgb(219, 157, 157);
                padding: 0.2rem 0;
            }
        }

        .media {
            h3 {
                font-size: 1.5rem;
                color: white;
                margin-bottom: 0.8rem;
                font-style: italic;
            }

            .icon {
                width: 2rem;
                height: 2rem;

                margin: 0 0.5rem;
                transition: all 0.3s;

                &:hover {
                    transform: scale(1.2);
                    cursor: pointer;
                }
            }
        }
    }

    .copyright {
        color: rgb(219, 157, 157);
        font-size: 0.8rem;
        margin-bottom: 1rem;
    }


}
</style>

<!-- 移动端样式 -->
<style lang="scss" scoped>
@media (max-width: 768px) {
    .footer {
        padding: 15px;
        /* 添加内边距 */
    }

    .footer-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tech,
    .contact,
    .media {
        text-align: center;
        margin-bottom: 10px;
    }

    h3 {
        font-size: 18px;
        /* 调整标题字体大小 */
    }

    p {
        font-size: 14px;
        /* 调整段落字体大小 */
    }

    .icon {
        width: 25px;
        /* 调整图标大小 */
        height: 25px;
        margin: 0 8px;
        /* 调整图标之间的间距 */
    }

    .copyright {
        text-align: center;
        margin-top: 10px;
        font-size: 12px;
        /* 调整版权信息字体大小 */
    }
}</style>
