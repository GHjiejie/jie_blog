<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
            @onCreated="handleCreated" />
    </div>
</template>
<script setup>
import { defineEmits, watch } from 'vue';
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const emits = defineEmits(['createBlog']);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('');

// 工具栏配置
const toolbarConfig = {}

// 编辑器配置
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
});

const handleCreated = (editor) => {
    console.log('editor 创建成功！');
    editorRef.value = editor // 记录 editor 实例，重要！
}

// 监听内容的变化
watch(valueHtml, (newValue) => {
    console.log('内容变化：', newValue);
    // 通过自定义方法将内容传递给父组件
    emits('createBlog', newValue);
})



</script>    