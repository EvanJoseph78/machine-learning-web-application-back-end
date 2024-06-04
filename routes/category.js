
const router = require("express").Router();

const categoryController = require("../controllers/categoryController");

//get all categories
router.get("/", categoryController.getAllCategories);

//create many categories
router.post("/addMany", categoryController.createManyCategories);

module.exports = router;
