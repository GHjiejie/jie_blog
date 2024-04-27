"use strict";

var blogService = require('../../services/blogService');

var blogController = {
  // 添加博客
  addBlog: function addBlog(req, res) {
    var _req$body, title, category, tag, author, time, result;

    return regeneratorRuntime.async(function addBlog$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, category = _req$body.category, tag = _req$body.tag, author = _req$body.author, time = _req$body.time; //    console.log('输出用户提交的数据',title,category,tag,author,time,req.file);

            _context.next = 3;
            return regeneratorRuntime.awrap(blogService.addBlog(title, category, tag, author, time, req.file));

          case 3:
            result = _context.sent;
            return _context.abrupt("return", res.json(result));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  // 获取博客
  getBlog: function getBlog(req, res) {
    var result;
    return regeneratorRuntime.async(function getBlog$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(blogService.getBlog());

          case 2:
            result = _context2.sent;
            return _context2.abrupt("return", res.json(result));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  // 获取博客详情
  getBlogDetail: function getBlogDetail(req, res) {
    var id, result;
    return regeneratorRuntime.async(function getBlogDetail$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return regeneratorRuntime.awrap(blogService.getBlogDetail(id));

          case 3:
            result = _context3.sent;
            return _context3.abrupt("return", res.json(result));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  // 删除博客
  deleteBlog: function deleteBlog(req, res) {
    var id, result;
    return regeneratorRuntime.async(function deleteBlog$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id; // console.log('输出用户提交的数据',id);

            _context4.next = 3;
            return regeneratorRuntime.awrap(blogService.deleteBlog(id));

          case 3:
            result = _context4.sent;
            return _context4.abrupt("return", res.json(result));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  // 修改博客
  updateBlog: function updateBlog(req, res) {
    var _req$body2, id, content, result;

    return regeneratorRuntime.async(function updateBlog$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, id = _req$body2.id, content = _req$body2.content;
            _context5.next = 3;
            return regeneratorRuntime.awrap(blogService.updateBlog(id, content));

          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", res.json(result));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};
module.exports = blogController;