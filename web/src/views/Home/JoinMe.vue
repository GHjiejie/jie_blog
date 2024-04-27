<template>
    <div class="joinMe">
        <div class="title"><span>加入我</span></div>
        <form>
            <input v-model="form.name" type="text" placeholder="姓名">
            <input v-model="form.email" type="email" placeholder="邮箱">
            <textarea v-model="form.reason" name="" id="" cols="40" rows="15" placeholder="加入缘由"></textarea>
            <el-button type="primary" @click="submit">提交</el-button>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
const form = reactive({
    name: '',
    email: '',
    reason: ''
});
const submit = () => {
    console.log(form);
    console.log('submit');
}
</script>

<style lang="scss" scoped>
.joinMe {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
        text-align: center;
        font-size: 2rem;



        span {
            font-weight: bold;
            padding: 0.5rem 1rem;
            color: rgb(0, 0, 0);
            font-size: 2rem;
            transition: all 0.3s ease-in-out;

            &:hover {
                background-color: rgba(255, 255, 255, 0.548);
                border-radius: 2rem;
                color: rgb(255, 0, 0);
            }
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    input {
        width: 80%;
        padding: 0.5rem;
        margin: 1rem 0;
        border: 1px solid #ccc;
        border-radius: 0.3rem;
        outline: none;
        transition: all 0.5s ease-in-out;

        &::placeholder {
            color: #999;
        }

        &:focus {
            border: 1px solid #007bff;
        }
    }

    textarea {
        width: 80%;
        padding: 0.5rem;
        margin: 1rem 0;
        border: 1px solid #ccc;
        border-radius: 0.3rem;
        outline: none;
        // transition: all 0.3s ease-in-out;

        &::placeholder {
            color: #999;
        }

        &:focus {
            border: 1px solid #007bff;
        }
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 0.3rem;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #0056b3;
        }
    }
}
</style>
