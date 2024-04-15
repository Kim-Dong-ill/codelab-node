const { default: mongoose } = require("mongoose");

const BoardScheam = mongoose.Schema({});

const Board = mongoose.model("board", BoardScheam);

module.exports = { Board };
