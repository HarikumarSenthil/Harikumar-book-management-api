"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = exports.bulkAddBooks = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const bulkAddBooks = async (books) => {
    return await bookModel_1.default.insertMany(books);
};
exports.bulkAddBooks = bulkAddBooks;
const createBook = async (data) => {
    return await bookModel_1.default.create(data);
};
exports.createBook = createBook;
const getAllBooks = async () => {
    return await bookModel_1.default.find();
};
exports.getAllBooks = getAllBooks;
const getBookById = async (id) => {
    return await bookModel_1.default.findById(id);
};
exports.getBookById = getBookById;
const updateBook = async (id, data) => {
    return await bookModel_1.default.findByIdAndUpdate(id, data, { new: true });
};
exports.updateBook = updateBook;
const deleteBook = async (id) => {
    return await bookModel_1.default.findByIdAndDelete(id);
};
exports.deleteBook = deleteBook;
