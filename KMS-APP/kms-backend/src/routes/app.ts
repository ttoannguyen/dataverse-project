const express = require("express");
const router = express.Router();
const testController = require(`../controllers/testController`);

router.post("/test", testController.testPostController);
router.get("/test", testController.testGetController);
router.get("/test/:id", testController.testGetByIdController);
router.put("/test/:id", testController.testUpdateController);
router.delete("/test/:id", testController.testDeleteController);

module.exports = router;
