const mongoose = require("mongoose");

const gJSchema = mongoose.Schema({

    id: {
        type : String,
        required: [true, "Please add your unique key"],
        unique: true,
    },
    ttype:{
            type : String,
          },
    ftype: {
            type : String,
          },
    aTitle: {
        type: String,
        required: [true, "Please add a tID"],
      },
      date: {
        type: String,
        required: [true, "Please add a date"],
      },
      amount: {
        type: String,
      },

    },

)

const gJ = mongoose.model("gJ", gJSchema);
module.exports = gJ;