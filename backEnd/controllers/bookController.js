const { query } = require("express");
const Book = require("../models/Book");
const Review = require("../models/ReviewBook");

//create one books
exports.createOneBook = async (req, res, next) => {
  try {
    const file = req.files.file;
    const book = await Book.create({
      ...req.body,
      images: [`/images/sach/${file.name}`],
    });
    file.mv(`../frontEnd/public/images/sach/${file.name}`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
    });
    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (error) {
    next(error);
  }
};

//get all books
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});
    res.status(200).send(books);
  } catch (error) {
    res.json(error);
  }
};

exports.getOnePage = async (req, res, next) => {
  try {
    const newParam = { ...req.query, active: true };

    var skip = (req.query.page - 1) * req.query.limit;
    var sort = req.query.sort.split(":");

    if (newParam.minPrice != null && newParam.maxPrice != null)
      newParam.price = { $gte: newParam.minPrice, $lte: newParam.maxPrice };

    if (newParam.minStar != null) newParam.star = { $gte: newParam.minStar };

    if (newParam.isPromotion != null) {
      newParam.discount = { $gt: 0 };
    }

    [
      "page",
      "sort",
      "limit",
      "minPrice",
      "maxPrice",
      "minStar",
      "isPromotion",
    ].forEach((e) => delete newParam[e]);

    const books = await Book.find(newParam)
      .sort([sort])
      .skip(skip)
      .limit(req.query.limit);
    const totalBooks = await Book.find(newParam).count();

    res.status(200).json({
      status: "success",
      data: books,
      pagination: {
        page: parseInt(req.query.page),
        limit: parseInt(req.query.limit),
        total: totalBooks,
      },
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getBooksBySearch = async (req, res, next) => {
  try {
    const books = await Book.find({
      name: { $regex: `(?i)${req.query.q}(?-i)` },
    });
    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getBooksSame = async (req, res, next) => {
  try {
    const books = await Book.find({
      $or: [{ author: req.query.author }, { publisher: req.query.publisher }],
    })
      .limit(15)
      .sort("-createdAt");
    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    res.status(200).send(book);
  } catch (err) {
    res.json(err);
  }
};

//update one books
exports.updateOneBook = async (req, res, next) => {
  try {
    console.log(req.body);
    const book = await Book.findByIdAndUpdate(
      req.params.bookId,
      { ...req.body },
      { new: true }
    );
    if (req.files != null) {
      const file = req.files.file;
      await Book.findOneAndUpdate(
        { _id: req.params.bookId },
        {
          $pop: {
            images: -1,
          },
        }
      );
      await Book.findOneAndUpdate(
        { _id: req.params.bookId },
        {
          $push: {
            images: {
              $each: [`/images/sach/${file.name}`],
              $position: 0,
            },
          },
        }
      );
      file.mv(`../frontEnd/public/images/sach/${file.name}`, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: "Error occured" });
        }
      });
    }
    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (error) {
    next(error);
  }
};

//delete one books
exports.deleteOneBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.status(200).json({
      status: "success",
      message: "Book has been delete",
    });
  } catch (error) {
    next(error);
  }
};

//get all books
exports.getAllReviewsBook = async (req, res, next) => {
  try {
    const reviewsBook = await Review.find({})
      .populate("idBook")
      .populate("idUser");
    res.status(200).json({
      status: "success",
      results: reviewsBook.length,
      data: { reviewsBook },
    });
  } catch (error) {
    res.json(error);
  }
};

//create one books
exports.createOneReviewBook = async (req, res, next) => {
  try {
    const reviewBook = await Review.create(req.body);
    res.status(200).json({
      status: "success",
      data: { reviewBook },
    });
  } catch (error) {
    next(error);
  }
};
