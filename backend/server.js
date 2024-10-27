const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// require database connection
const dbConnect = require("./db/dbConnect");
dbConnect();

// require database schema
const User = require("./db/userModel");

app.listen(5001, () => {
	console.log("NodeJS Server for AIpetite started!");
});

app.get("/", (req, res) => {
    res.send({status: "AIpetite started!"});
});

app.post("/register", async(req, res) => {
    const {email, password, confirmPassword} = req.body;
		try {
			const oldUser = await User.findOne({email: email});
			if (oldUser) {
				return res.status(400).send("User already exists");
			}
		} catch (error) {
			return res.status(500).send("Server error: " + error.message);
		}

		if (password === confirmPassword) {
			try {
				const hashedPassword = await bcrypt.hash(password, 10);
				const newUser= await User.create({
					email: email,
					password: hashedPassword,
				});
				await newUser.save();
				return res.status(201).send("User registered successfully");
			} catch (error) {
				return res.status(500).send("Error registering user: " + error.message);
			}
		} else {
			return res.status(400).send("Passwords do not match");
		}
});

app.post("/login", async(req, res) => {
	const {email, password} = req.body;
	try {
		const oldUser = await User.findOne({email: email});
		if (!oldUser) {
			return res.status(400).send("User does not exist");
		} 

		if (await bcrypt.compare(password, oldUser.password)) {
			const token = jwt.sign(
				{email: oldUser.email}, 
				"RANDOM-TOKEN", 
				{expireIn: "24h"}
			);
			res.status(200).send({
				message: "Login successful",
				email: oldUser.email,
				token,
			});
		} else {
			return res.status(400).send("Wrong passwords");
		}
	} catch (error) {
		return res.status.send(500).send("Error logging in: " +error.message);
	}
});