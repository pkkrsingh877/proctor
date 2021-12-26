const express = require('express');
const router = express.Router();

router.get('/maths', (req, res) => {
    console.log('maths');
    res.render('practice/maths');
});

router.get('/cs', (req, res) => {
    console.log('cs');
    res.render('practice/cs');
});

router.get('/', (req, res) => {
    console.log('practice page');
    res.render('practice/index');
});

module.exports = router;