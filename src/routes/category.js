const router = require("express").Router();

const {
	createCategory,
	readCategories,
	updateCategory,
	deleteCategory,
} = require("../controllers/category");

// Create Category
router.post("/category", createCategory);

// Read Categories
router.get("/category/:id", readCategories);

// Update Category
router.patch("/category/:id", updateCategory);

// Delete Category
router.delete("/category/:id", deleteCategory);

module.exports = router;
