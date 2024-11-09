const router = require('express').Router();
const {updateFinished} = require('../controllers/updateFinished');

router.route('/updatefinished/:id').put(updateFinished)

module.exports =  router
