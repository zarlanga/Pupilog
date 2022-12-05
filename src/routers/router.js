const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/general.js")


router.use("/", ctrl.logg)

router.get('/66', ctrl.pappo)

router.get('/pupi', ctrl.fetchh)

router.get('/@:id', ctrl.template)

router.post('/@:id', ctrl.postComment)


module.exports = router