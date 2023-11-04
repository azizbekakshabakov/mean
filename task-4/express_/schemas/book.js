const mongoose = require("mongoose");
const joi = require("joi");

const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: ObjectId, ref: "author", required: true },
  year: { type: Number, required: true },
});

const validate = (book) => {
  const schema = joi.object({
    name: joi.string().required(),
    author: joi.string().required(),
    year: joi.number().required(),
  });
  return schema.validate(book);
};

const Book = mongoose.model("book", bookSchema);

module.exports = { Book, validate };

/*const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
  },
  author: {
    type: String,
    required: true,
    minLength: 6,
  },
  year: {
    type: Number,
    required: true,
    match: [/^[0-9]+$/, "incorrect year"],
  },
  // email: {
  //     type: String,
  //     required: true,
  //     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  // },
  token: String,
});*/
