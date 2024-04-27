const {
    marked
} = require('marked');
const blogModel = require('../../model/blogModel/blogModel.js');
// 定义静态资源路径
// const staticPath = 'D:/blog/server/public/uploads';
// const fs = require('fs');
// const path = require('path');
const blogService = {

    // 添加博客(含文件上传)

    // addBlog:async(title,category,tag,author,time,file)=>{
    //     // console.log('输出用户提交的数据',file);
    //         // 获取博客的文件名
    //     const blogFileName=file.filename;

    //     const article =fs.readFileSync(path.join(staticPath,blogFileName));
    //     // console.log('获取博客详情成功，我们输出一下content',article);
    //     const content=marked(article.toString());
    //     const result=await blogModel.create({title,category,tag,author,time,content});
    //     // console.log('博客添加成功，我们输出一下result',result);
    //     return resultCheck(result);
    // },



    // 添加博客(不含文件上传)
    addBlog: async (title, category, tag, author, published, date, year, content) => {
        // 将date里面的/替换成-
        date = date.replace(/\//g, '-');
        // 将content文件写入到本地
        // 根据当前的年份和日期创建文件夹
        // const yearPath = path.join(staticPath, String(year));
        // const datePath = path.join(yearPath, String(date));
        // 判断文件夹是否存在
        // if (!fs.existsSync(yearPath)) {
        //     fs.mkdirSync(yearPath);
        // }
        // if (!fs.existsSync(datePath)) {
        //     fs.mkdirSync(datePath);
        // }

        // 将content文件写入到本地(部署后不需要这个了，直接在数据库里面看就好了)
        // fs.writeFileSync(path.join(datePath, `${title}.md`), content);

        // 将用户提交的md文件转换成html格式
        content = marked(content);

        // console.log('输出用户提交的数据',title,category,tag,author,published,date,year,content);
        const result = await blogModel.create({
            title,
            category,
            tag,
            author,
            published,
            date,
            year,
            content
        });
        return resultCheck(result);
    },
    // 获取所有博客
    getBlog: async () => {
        const result = await blogModel.find();
        // console.log('获取博客成功，我们输出一下result',result);
        return resultCheck(result);
    },

    // 根据id获取博客详情
    getBlogDetail: async (id) => {
        const result = await blogModel.findById(id);
        // console.log('获取博客详情成功，我们输出一下result',result);
        return resultCheck(result);
    },


    // 根据标签获取博客列表
    getBlogByTag: async (tag) => {
        const result = await blogModel.find({ tag });
        // console.log('获取博客列表成功，我们输出一下result',result);
        return resultCheck(result);
    },
    // 删除博客
    deleteBlog: async (id) => {
        const result = await blogModel.findByIdAndDelete(id);
        // console.log('删除博客成功，我们输出一下result',result);
        return resultCheck(result);
    },

    // 修改博客
    updateBlog: async (id, content) => {
        // 根据id修改博客
        const result = await blogModel.findByIdAndUpdate(id, {
            content
        });
        console.log('修改博客成功，我们输出一下result', result);
        return resultCheck(result);
    }
}

const resultCheck = (result) => {
    if (result) {
        return {
            code: 200,
            data: result,
            msg: 'success'
        }
    } else {
        return {
            code: 500,
            data: null,
            msg: 'error'
        }
    }
}

module.exports = blogService;