const Category = require("../models/category");
const getColor = require("../utils/color");

createCategory = async (req, res) => {
	try {
		const isCategoryAvail = await Category.findOne({
			category_id: { $eq: req.body.category_id },
		});
		if (isCategoryAvail) {
			return res.status(409).send({ message: "Category already exists." });
		}
		let category = new Category(req.body);
		category.percentage =
			(category.current_target / category.total_target) * 100;
		category.color = getColor(category.percentage);
		await category.save();
		res.send(category);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

readCategories = async (req, res) => {
	try {
		const category = await Category.find({
			$or: [
				{ category_id: req.params.id },
				{ parent_category_id: req.params.id },
			],
		}).limit(req.query.level || 10);
		if (!category.length === 0)
			return res
				.status(404)
				.send({ message: "Category not found with given data." });
		res.send(category);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

updateCategory = async (req, res) => {
	let updates = Object.keys(req.body);
	const availableUpdates = ["title", "current_target", "total_target"];
	const isValid = updates.every((update) => availableUpdates.includes(update));
	if (!isValid) {
		return res.status(400).send({ message: "Invalid response received" });
	}

	try {
		const category = await Category.findOne({ category_id: req.params.id });
		if (!category)
			return res
				.status(404)
				.send({ message: "Category not found with given data." });

		updates.forEach((update) => (category[update] = req.body[update]));
		category.percentage =
			(category.current_target / category.total_target) * 100;
		category.color = getColor(category.percentage);

		// // Updating the hierarchy
		// let categories = await Category.find({
		// 	$or: [
		// 		{ category_id: category.parent_category_id },
		// 		{ parent_category_id: category.parent_category_id },
		// 	],
		// });
		// for (var i = 0; i < categories.length; i++) {
		// 	// Skip the current category
		// 	if (categories[i].category_id === category.category_id) {
		// 		return;
		// 	}
		// 	// categories[i].
		// 	category.percentage =
		// 		(category.current_target / category.total_target) * 100;
		// 	category.color = getColor(category.percentage);
		// }

		await category.save();
		res.send(category);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

deleteCategory = async (req, res) => {
	try {
		let categories = [];
		if (req.query.deleteAll === "true") {
			categories = await Category.deleteMany({
				$or: [
					{ category_id: req.params.id },
					{ parent_category_id: req.params.id },
				],
			});
		} else {
			categories = await Category.deleteOne({
				category_id: req.params.id,
			});
		}
		if (categories.length === 0)
			return res
				.status(404)
				.send({ message: "Category not found with given data." });
		return res.send(categories);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = {
	createCategory,
	readCategories,
	updateCategory,
	deleteCategory,
};
