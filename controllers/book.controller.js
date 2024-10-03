const { get } = require("mongoose");
const Book = require("../models/book.model");
const User = require("../models/user.model");

async function addBookingToUser(userId, bookId) {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      $push: {
        bookedTravels: bookId,
      },
    },
    {
      new: true,
    }
  );
}

const bookController = {
  getAllBooks: async (req, res, next) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  },
  getBookById: async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  },
  getAllBooksByUserId: async (req, res, next) => {
    try {
      const books = await Book.find({ userId: req.params.id });
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  },
  createBook: async (req, res, next) => {
    try {
      console.log(req.body);
      const book = await Book.create(req.body);
      addBookingToUser(book.userId, book._id);

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  },
  updateBookById: async (req, res, next) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json("Book updated successfully");
    } catch (error) {
      next(error);
    }
  },
  deleteBookById: async (req, res, next) => {
    try {
      console.log(req.params.id);
      const book = await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("Book deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bookController;
