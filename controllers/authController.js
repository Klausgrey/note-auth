const express = require("express");
const db = require("../models/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!username || !password) {
		return res.status(400).json({message: "Username and password required"})
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`).run(
		username,
		hashedPassword,
	);

	res.json({ message: "Registered successfully" });
};

const login = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const user = db
		.prepare(`SELECT * FROM users WHERE username = (?)`)
		.get(username);

	if (!user) {
		return res.json({ message: "User not found" });
	}

	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		return res.json({ message: "Wrong password" });
	}

	const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
	res.json({ token });
};

module.exports = { register, login };
