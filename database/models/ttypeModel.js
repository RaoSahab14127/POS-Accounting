const mongoose = require("mongoose");

const ttypeSchema = mongoose.Schema(
  {
    ttype: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "gJ",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    }
  }
);

const ttype = mongoose.model("ttype", ttypeSchema);
module.exports = ttype;