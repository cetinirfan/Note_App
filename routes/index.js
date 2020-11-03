const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Note_App API Server' });
  });
module.exports = router;
