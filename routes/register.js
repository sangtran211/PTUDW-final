const express = require('express');
const router = express.Router();

/* Get register page */
router.get('/', (req, res) => {
    res.render('register', {
        layout: false
    });
});

module.exports = router;