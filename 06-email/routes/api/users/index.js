const express = require("express");
const router = express.Router();

const validate = require("./validation");
const userController = require("../../../controllers/userController");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

router.post("/auth/register", validate.register, userController.register);
router.post("/auth/login", validate.login, userController.login);
router.post("/auth/logout", guard, userController.logout);
router.patch("/", guard, validate.updateUser, userController.updateUser);
router.get("/", guard, userController.getUserInfo);
router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validate.uploadAvatar],
  userController.avatars
);
router.get("/auth/verify/:verificationToken", userController.verify);

module.exports = router;
