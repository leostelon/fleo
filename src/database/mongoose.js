const mongoose = require("mongoose");
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/fleo";

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
	console.log("Connected to the Database.");
});
