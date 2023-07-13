const mongoose = require("mongoose");

const ftypeSchema = mongoose.Schema(
  {
    ftype: {
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

const ftype = mongoose.model("ftype", ftypeSchema);
module.exports = ftype;