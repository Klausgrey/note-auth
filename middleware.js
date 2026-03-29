const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.json({ message: "Something went wrong" });
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return res.json({ message: "Something went wrong" });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};

module.exports = { verifyToken };
