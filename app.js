const express = require("express");
const Database = require("better-sqlite3");
const db = new Database("app.db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());

db.pragma("foreign_keys = ON");
db.prepare(
	`
	CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT NOT NULL,
	password TEXT NOT NULL
	)
`,
).run();

db.prepare(
	`
	CREATE TABLE IF NOT EXISTS notes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT NOT NULL,
	content TEXT NOT NULL,
	user_id INTEGER NOT NULL
	)
`,
).run();

app.post("/register", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const hashedPassword = await bcrypt.hash(password, 10);

	db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`).run(
		username,
		hashedPassword,
	);

	res.json({ message: "Registered successfully" });
});

app.post("/login", async (req, res) => {
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
});

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
		jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};

app.get("/notes", verifyToken, (req, res) => {
	const result = db
		.prepare("SELECT * FROM notes WHERE user_id = ?")
		.all(req.user.id);
	res.json({ result });
});

app.post("/notes", verifyToken, (req, res) => {
	const { title, content } = req.body;
	const userId = req.user.id;

	db.prepare(
		"INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)",
	).run(title, content, userId);

	res.json({ message: "Created successfully" });
});

app.delete("/notes/:id", verifyToken, (req, res) => {
	const noteId = Number(req.params.id);
	const userId = req.user.id;

	db.prepare("DELETE FROM notes WHERE id = ? AND user_id = ?").run(
		noteId,
		userId,
	);
	res.json({ message: "Deleted successfully" });
});

app.put("/notes/:id", verifyToken, (req, res) => {
	const noteId = Number(req.params.id);
	const userId = req.user.id;

	const { title, content } = req.body;

	db.prepare(
		"UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?",
	).run(title, content, noteId, userId);

	res.json({message: "Updates successfully"})
});

app.listen(3000, () => {
	console.log("Running");
});
