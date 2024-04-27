<template>
    <div class="update">
        <div class="update-top">
            <el-button type="primary" class="info" @click="messageInfo">提示</el-button>
            <div class="title"><span>{{ props.blogObj.title }}</span></div>
        </div>
        <div class="editorBox">
            <div ref="editor" style="height: 75vh">
            </div>
        </div>
        <el-button type="primary" class="submitBtn" @click="submitBlog"> 提交</el-button>
    </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { ElNotification, ElMessage } from 'element-plus';
import axios from 'axios';


const editor = ref(null);
let quillInstance = null;


// 获取父组件传递的信息
const props = defineProps({
    blogObj: {
        type: Object,
        required: true,
    }
});
//设置提示信息
const messsage = `
    <div>
        <p>1. 文章主标题设置为h1</p>
        <p>2. 每个模块内容的标题等级设置为h2</p>
        <p>3. 不建议修改文章的行间距</p>
        <p>4. 暂时不支持图片上传</p>
        <p>5. 请不要修改代码的样式,文章被渲染时会自动添加样式</p>
    </div>
`

// 设置工具栏
var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // 粗体、斜体、下划线、删除线按钮。
    ['blockquote', 'code-block'],                     //引用块和代码块按钮。
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // 有序列表和无序列表按钮
    [{ 'script': 'sub' }, { 'script': 'super' }],     // 上标/下标按钮
    [{ 'indent': '-1' }, { 'indent': '+1' }],         // 缩进按钮
    [{ 'direction': 'rtl' }],                         // 文本方向按钮

    [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小按钮
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // 标题按钮

    [{ 'color': [] }, { 'background': [] }],          // 字体颜色和背景颜色按钮

    [{ 'align': [] }],                                // 对齐按钮

    ['clean']                                         // 清除格式按钮
];

// 设置富文本编辑器的配置
const options = {
    syntax: true,
    modules: {
        toolbar: toolbarOptions
    },
    placeholder: '请输入内容....',
    theme: 'snow'
};



// 打开建议信息框
const messageInfo = () => {
    ElNotification({
        title: '建议',
        type: 'info',
        dangerouslyUseHTMLString: true,
        message: messsage,
        position: 'top-right',
        duration: 3500
    })
}

// 提交博客
const submitBlog = async () => {
    console.log(props.blogObj._id);
    // 获取富文本编辑器中的内容
    const content = quillInstance.root.innerHTML;
    console.log(content);
    // 发送ajax请求到后端
    const res = await axios.put('/api/blog', {
        id: props.blogObj._id,
        content: content
    });
    if (res.data.code === 200) {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
    } else {
        ElMessage({
            message: '修改失败',
            type: 'error',
        })
    }
    console.log(res);


}
// 页面初始化
onMounted(async () => {
    // 获取博客详情

    // 创建富文本编辑器
    quillInstance = new Quill(editor.value, options);

    // 设置样式仅仅是显示，存储在数据库的不会变
    const editorContent = document.querySelector('.ql-editor');
    //    设置行间距
    editorContent.style.lineHeight = '2.5rem';

    // 将获取的内容显示在富文本编辑器中
    quillInstance.clipboard.dangerouslyPasteHTML(props.blogObj.content);


});



// 监听博客内容的变化
watch(() => props.blogObj.content, (newVal, oldVal) => {
    console.log('博客内容发生变化');
    //将获取的内容显示在富文本编辑器中
    quillInstance.clipboard.dangerouslyPasteHTML(newVal);


});


</script>

<style lang="scss" scoped>
.update {
    ::-webkit-scrollbar {
        width: 5px;
        // height: 5px;
    }

    /* 修改滚动条轨道颜色 */
    ::-webkit-scrollbar-track {
        background: #ffffff;
    }

    /* 修改滚动条滑块颜色 */
    ::-webkit-scrollbar-thumb {
        background: rgb(0, 0, 0);
    }

    .update-top {
        // height: 20vh;
        display: flex;

        .info {
            font-size: 1rem;
            font-weight: bolder;
            border-radius: 2rem;
            border: none;

        }

        .title {
            font-size: 1.5rem;
            font-weight: bolder;
            padding: 0 0 1rem 0;
            text-align: center;
            margin: 0 auto;
        }

    }

    .submitBtn {
        margin-top: 1rem;
        width: 100%;
        border-radius: 2rem;
    }

}
</style>
