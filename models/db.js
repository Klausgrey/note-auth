const Database = require("better-sqlite3");
const db = new Database("app.db");

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

module.exports = db