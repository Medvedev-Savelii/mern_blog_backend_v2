const router = require("express").Router();
const userController = require("../controllers/userController");

//Get User in DB
router.get("/:id", userController.getUser);
//Update User in DB
router.put("/:id", userController.updateUser);

module.exports = router;
