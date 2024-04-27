import { createRouter } from "vue-router";

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/Home.vue"),
  },
  {
    path: "/center",
    name: "center",
    component: () => import("../views/center/Center.vue"),
  },

  // 博客管理路由
  {
    path: "/blog-manage/addBlog",
    component: () => import("../views/blog-manage/BlogAdd.vue"),
  },
  {
    path: "/blog-manage/blogDetail/:id",
    component: () => import("../views/blog-manage/BlogDetail.vue"),
  },
  {
    path: "/blog-manage/deleteBlog",
    component: () => import("../views/blog-manage/BlogDelete.vue"),
  },
  // {
  //     path:'/blog-manage/updateBlog/:id',
  //     component:()=>import('../views/blog-manage/BlogUpdate.vue')
  // },
  {
    path: "/blog-manage/blogList",
    component: () => import("../views/blog-manage/BlogList.vue"),
  },

  {
    path: "/user-manage/AddUser",
    component: () => import("../views/user-manage/AddUser.vue"),
  },
  {
    path: "/user-manage/UserList",
    component: () => import("../views/user-manage/UserList.vue"),
  },
  {
    //用户反馈信息
    path: "/feedback/feedbackList",
    component: () => import("../views/feedback/FeedbackList.vue"),
  },
  // 评论管理路由
  {
    path: "/comment-manage/deleteComment",
    component: () => import("../views/comment-manage/CommentDelete.vue"),
  },
  {
    path: "/comment-manage/replyComment",
    component: () => import("../views/comment-manage/CommentReply.vue"),
  },
  // 博客分类管理路由
  {
    path: "/classification-manage/addClassification",
    component: () =>
      import("../views/classification-manage/ClassificationAdd.vue"),
  },
  {
    path: "/classification-manage/deleteClassification",
    component: () =>
      import("../views/classification-manage/ClassificationDelete.vue"),
  },
  {
    path: "/classification-manage/updateClassification",
    component: () =>
      import("../views/classification-manage/ClassificationUpdate.vue"),
  },
  {
    path: "/classification-manage/classificationList",
    component: () =>
      import("../views/classification-manage/ClassificationList.vue"),
  },

  // 博客标签管理路由
  {
    path: "/tag-manage/addTag",
    component: () => import("../views/tag-manage/TagAdd.vue"),
  },
  {
    path: "/tag-manage/deleteTag",
    component: () => import("../views/tag-manage/TagDelete.vue"),
  },
  {
    path: "/tag-manage/updateTag",
    component: () => import("../views/tag-manage/TagUpdate.vue"),
  },
  {
    path: "/tag-manage/tagList",
    component: () => import("../views/tag-manage/TagList.vue"),
  },

  // 关于我管理路由

  // 我的技能
  {
    path: "/aboutMe/skill/skillWallList",
    component: () => import("../views/aboutMe/skill/skillWallList.vue"),
  },
  {
    path: "/aboutMe/skill/skillWallEdit",
    component: () => import("../views/aboutMe/skill/skillWallEdit.vue"),
  },

  // 我的项目
  {
    path: "/aboutMe/project/projectWallList",
    component: () => import("../views/aboutMe/project/projectWallList.vue"),
  },
  {
    path: "/aboutMe/project/projectWallEdit",
    component: () => import("../views/aboutMe/project/projectWallEdit.vue"),
  },

  // 我的生活
  {
    path: "/aboutMe/life/lifeWallList",
    component: () => import("../views/aboutMe/life/lifeWallList.vue"),
  },
  {
    path: "/aboutMe/life/lifeWallEdit",
    component: () => import("../views/aboutMe/life/lifeWallEdit.vue"),
  },
  {
    path: "/aboutMe/life/lifeImgCategory",
    component: () => import("../views/aboutMe/life/lifeImgCategory.vue"),
  },

  // 媒体库管理路由
  {
    path: "/media-manage/imageManage",
    component: () => import("../views/media-manage/images.vue"),
  },
  {
    path: "/media-manage/videoManage",
    component: () => import("../views/media-manage/videoes.vue"),
  },

  // 统计和分析管理路由
  {
    path: "/statisticsAndanalysis/statistics",
    component: () => import("../views/statisticsAndanalysis/statistics.vue"),
  },
  {
    path: "/statisticsAndanalysis/analysis",
    component: () => import("../views/statisticsAndanalysis/analysis.vue"),
  },

  // 主题管理
  {
    path: "/theme-manage",
    component: () => import("../views/theme-manage/theme.vue"),
  },
];

export default routes;
