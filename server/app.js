const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// const cors = require('cors');
const logger = require("morgan");
// const  JWT = require('./util/JWT');
const authenticateUser = require("./middleware/authMiddleware");
// const multer = require('multer'); // 导入multer模块

// 导入mongoose模块
require("./config/mongodb.config");

const indexRouter = require("./routes/index");
// const usersRouter = require('./routes/users');
// const blogRouter = require('./routes/blog');
// const blogTagRouter = require('./routes/blogTag');
// const contactMeRouter = require('./routes/contact');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// 用户身份验证中间件
app.use(authenticateUser);

app.use("/", indexRouter);
// router.use('/api', apiRoutes);

// app.use('/adminApi/user', usersRouter);
// app.use('/WebApi/contact', contactMeRouter);

// app.use('/commonApi/blog', blogRouter);
// app.use('/commonApi/tag', blogTagRouter);

module.exports = app;
