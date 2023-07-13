const asyncHandler = require("express-async-handler");
const gJ = require("../models/gJ");
const registerGJ = asyncHandler(async (req, res) => {
  const {id, ttype, ftype, aTitle, date, amount  } = req.body;

  // Check if user email already exists
  const gJExists = await gJ.findOne({ id });

  if (gJExists) {
    res.status(400);
    throw new Error("id has already been registered");
  }


  // Create new user
  const gj = await gJ.create({
    id, ttype, ftype, aTitle, date, amount
  });

  if (gj) {
    const { _id, ttype, ftype, aTitle, date, amount } = gj;
    res.status(201).json({
        _id, ttype, ftype, aTitle, date, amount
    });
  } else {
    res.status(400);
    throw new Error("Invalid gJ data");
  }
});

module.exports = {
    registerGJ,
};