const express = require('express');
const router = express.Router();
const Loading_Controler = require('../Controller/Demo');
const HandleControler = new Loading_Controler();


router.get('/Select/:ID', HandleControler.Select);
router.post('/Update/:ID', HandleControler.Update);
module.exports = router;