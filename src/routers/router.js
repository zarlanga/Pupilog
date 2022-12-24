const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/general.js")


router.use("/", ctrl.logg)

router.get('/66', ctrl.pappo)

router.get("/crearusuario", ctrl.createUserForm)

router.post("/crearusuario", ctrl.createUserPost)

router.post('/crearposteo', ctrl.crearposteo)

router.get('/@:id', ctrl.template)

router.post('/@:id', ctrl.postComment)


router.get('/pupi', ctrl.fetchh)





module.exports = router