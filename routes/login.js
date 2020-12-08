const express = require('express');
const router = express.Router();

/* Get login page */
router.get('/', (req, res)=> {
    res.render('./login/login', {
        layout: false
    });
});

module.exports = router;