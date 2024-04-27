<template>
    <el-table :data="userDate" height="100%" style="width: 100%">
        <el-table-column prop="avatar" label="用户头像" width="200">
            <template #default="{ row }">
                <img :src="row.avatar" alt="">
            </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="200" />
        <el-table-column prop="role" label="身份" width="200" />

        <el-table-column label="操作">
            <template #default="{ row }">
                <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
                <el-button type="danger" size="small" @click="deleteUser(row._id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="showEditPanel" title="修改用户信息" @close="closeDialog">
        <form class="updateForm">
            <!-- <label for="avatar">头像</label> -->
            <div class="imgGroup">
                <img :src="currentUserAvatar" alt="" v-if="showOldAvatar" class="animationFadeIn">
                <img :src="newAvatar" alt="" v-if="showNewAvatar" class="animationFadeIn">
            </div>
            <el-button type="primary" @click="updateImg" class="changeImgBtn">
                <span>更换头像</span>
            </el-button>
            <input type="file" class="updateAvatar" name="newAvatar" ref="updateAvatarRef" @change="handleUserAvatar">
            <!-- 显示当前用户的信息 -->
            <!-- <label for="username">用户名</label> -->
            <input type="text" placeholder="请输入用户名" id="username" v-model="updateUserForm.username" class="updateUsername">
            <!-- 下拉框 -->
            <!-- <label for="role">身份</label> -->
            <el-radio-group id="role" v-model="updateUserForm.role">
                <el-radio label="管理员">管理员</el-radio>
                <el-radio label="普通用户">普通用户</el-radio>
            </el-radio-group>
        </form>
        <!-- 头像 -->

        <!-- <input type="file" name="avatar" id="avatar"> -->


        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitUpdate">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script  setup>
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import axios from 'axios'
const updateAvatarRef = ref(null);
const showEditPanel = ref(false);
const showNewAvatar = ref(false);
let newAvatar = ref('');
const userDate = ref([]);
const showOldAvatar = ref(true);
const updateUserForm = reactive({
    userId: '',
    username: '',
    role: '',
});
const currentUserAvatar = ref('');
// 页面初始化
onMounted(async () => {
    const res = await axios.get('/api/user');
    if (res.status === 200) {
        userDate.value = res.data;
    } else {
        ElMessage.error('获取用户列表失败');
    }
});

// 点击更换按钮
const updateImg = () => {
    updateAvatarRef.value.click();

}
// 关闭弹窗
const closeDialog = () => {
    // console.log('关闭弹窗');
    showNewAvatar.value = false;
    showOldAvatar.value = true;
    // 将原来选择的文件名清空
    updateAvatarRef.value.value = '';
}

// 处理用户提交的头像
const handleUserAvatar = () => {
    let file = updateAvatarRef.value.files[0];
    // console.log(file);
    const newImg = URL.createObjectURL(file);
    newAvatar.value = newImg;
    showNewAvatar.value = true;
    showOldAvatar.value = false;
}
// 编辑用户
const edit = (currentUser) => {
    console.log(currentUser);
    updateUserForm.userId = currentUser._id;
    updateUserForm.username = currentUser.username;
    updateUserForm.role = currentUser.role;
    currentUserAvatar.value = currentUser.avatar;
    showEditPanel.value = true;
}
// 删除用户
const deleteUser = async (id) => {
    // 弹窗提示
    ElMessageBox.confirm(
        '此操作将永久删除该用户, 是否继续?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            const res = await axios.delete(`/api/user/${id}`);
            if (res.status === 200) {
                ElMessage.success('删除用户成功');
                // 在不重新获取数据的情况下，更新删除后的列表
                userDate.value = userDate.value.filter(item => item._id !== id);

            } else {
                ElMessage.error('删除用户失败');
            }
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消删除',
            })
        })
}

// 提交修改
const submitUpdate = async () => {
    console.log(updateUserForm);
    console.log(updateAvatarRef.value.files[0]);
    const res = await axios({
        method: 'put',
        url: `/api/user`,
        data: {
            userId: updateUserForm.userId,
            username: updateUserForm.username,
            role: updateUserForm.role,
            newAvatar: updateAvatarRef.value.files[0],
        },
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (res.status === 200) {
        // 在不重新获取数据的情况下，更新修改后的列表(还未实现)
        // 重新获取数据
        const res = await axios.get('/api/user');
        if (res.status === 200) {
            ElMessage.success('修改用户成功');
            if (userDate) {
                userDate.value = [];
                userDate.value = res.data;
            }
            showEditPanel.value = false;
        } else {
            ElMessage.error('获取用户列表失败');
        }

    } else {
        ElMessage.error('修改用户失败');

    }

}

</script>


<style lang="scss" scoped>
img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
}

.updateForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem;



    .updateUsername {
        width: 75%;
        // height: 2rem;
        border: 1.5px solid rgb(0, 0, 0);
        border-radius: 5px;
        padding: 0.5rem 1rem;
        outline: none;
        margin: 2rem 0;

        &:hover {
            border: 1.5px solid blue;
        }
    }

    select {
        width: 100%;
        // height: 2rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        outline: none;
    }
}

.updateAvatar {
    display: none;
}

.animationFadeIn {
    animation: fadeIn 0.5s ease-in-out;

    @keyframes fadeIn {

        0% {
            transform: scale(0.5);
            opacity: 0;
        }

        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
}

.changeImgBtn {
    margin-top: 1rem;
    background-color: #000000;
    border-radius: 2rem;
    color: white;
    border: none;
    transition: all 0.3s ease-in-out;

    span {
        font-size: 0.8rem;

    }

    &:hover {
        background-color: #ffffff;
        color: #ff0000;
    }
}
</style>