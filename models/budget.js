var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var budgetSchema = new Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

var Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
