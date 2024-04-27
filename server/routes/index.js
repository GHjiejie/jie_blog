
const express = require('express');
const router = express.Router();

// 引入adminAPI路由
const apiRoutes = require('./adminAPI/index');
router.use('/api', apiRoutes);

// 引入WebAPI页面路由
const webRoutes = require('./webAPI/index');
router.use('/web', webRoutes);

module.exports = router;
