const express = require("express");
const db = require("../models/db");

const getAll = (req, res) => {
	const result = db
		.prepare("SELECT * FROM notes WHERE user_id = ?")
		.all(req.user.id);
	res.json({ result });
};

const create = (req, res) => {
	const { title, content } = req.body;
	const userId = req.user.id;

	db.prepare(
		"INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)",
	).run(title, content, userId);

	res.json({ message: "Created successfully" });
};

const deleteById = (req, res) => {
	const noteId = Number(req.params.id);
	const userId = req.user.id;

	db.prepare("DELETE FROM notes WHERE id = ? AND user_id = ?").run(
		noteId,
		userId,
	);
	res.json({ message: "Deleted successfully" });
};

const updateById = (req, res) => {
	const noteId = Number(req.params.id);
	const userId = req.user.id;

	const { title, content } = req.body;

	db.prepare(
		"UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?",
	).run(title, content, noteId, userId);

	res.json({ message: "Updates successfully" });
};

module.exports = { create, getAll, deleteById, updateById };
