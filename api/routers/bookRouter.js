const express = require("express");
const bookRouter = express.Router();
const { addBookToDB, getAllBooksFromDB } = require('../controllers/book');

const getAllBooks = (req, res) => {
    getAllBooksFromDB()
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        })
        .then(result => res.send(result));
};

const addBook = (req, res) => {
    const book = req.body;
    addBookToDB(book)
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        })
        .then(result => res.send(result));
}

const getSingleBook = () => {};

//localhost:3010/book
bookRouter.get('/', getAllBooks);
bookRouter.post('/', addBook);
bookRouter.get('/:id', getSingleBook);

module.exports = bookRouter;