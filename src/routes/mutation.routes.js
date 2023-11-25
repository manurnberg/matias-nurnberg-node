const router = require("express").Router();

const mutationController = require("../controllers/mutation.controller.js")

router.get('/stats', mutationController.getData);
router.post('/mutation', mutationController.checkMutation);

module.exports = router;