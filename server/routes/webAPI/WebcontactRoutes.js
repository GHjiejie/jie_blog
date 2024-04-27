const express = require('express');
const router = express.Router();

const contactMeController = require('../../controller/contactMeController/index');
router.post('/',contactMeController.addContact);
router.get('/',contactMeController.getContact);
module.exports = router;


