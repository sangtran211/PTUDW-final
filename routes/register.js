const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{
    res.render('register',{
        layout:false
    });
});


module.exports = router;