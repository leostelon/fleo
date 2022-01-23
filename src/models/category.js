const mongoose = require("mongoose");
const getColor = require("../utils/color");

const CategorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		category_id: {
			type: String,
			required: true,
			unique: true,
		},
		parent_category_id: {
			type: String,
			default: null,
		},
		total_target: {
			type: Number,
			required: true,
			deault: 0,
		},
		current_target: {
			type: Number,
			required: true,
			deault: 0,
		},
		percentage: {
			type: Number,
			required: true,
		},
		color: {
			type: String,
			required: true,
			enum: ["red", "orange", "green"],
		},
	},
	{
		timestamps: true,
	}
);

// // Pre and Post Check
// CategorySchema.pre("save", function (next) {
// 	let category = this;
// 	// if (!this.isModified("current_target") || this.isModified("total_target")) {
// 	// 	return next();
// 	// }

// 	next();
// });

const Category = new mongoose.model("Category", CategorySchema);
// Category.syncIndexes();

module.exports = Category;
