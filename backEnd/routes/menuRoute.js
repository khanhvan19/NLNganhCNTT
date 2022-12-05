const express = require("express");
const menu = require("../controllers/menuController");
const router = express.Router();

router.route("/").get(menu.getAllMenus).post(menu.createOneMenu);

router
  .route("/:id")
  .get(menu.getSubMenu)
  .put(menu.updateMenu)
  .delete(menu.deleteMenu);

router.route("/:parent").post(menu.addSubMenu);

router.route("/:parent/:id").put(menu.updateSubMenu).delete(menu.deleteSubMenu);

module.exports = router;
