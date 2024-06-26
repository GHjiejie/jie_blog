const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/', (req, res) => {
    res.send('Hello World!');
});

router.delete('/:id', (req, res) => {
    res.send('Hello World!');
});

router.put('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;
