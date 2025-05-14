import BookModel, { BookInput } from '../models/bookModel';

export const bulkAddBooks = async (books: BookInput[]) => {
  return await BookModel.insertMany(books);
};

export const createBook = async (data: BookInput) => {
  return await BookModel.create(data);
};

export const getAllBooks = async () => {
  return await BookModel.find();
};

export const getBookById = async (id: string) => {
  return await BookModel.findById(id);
};

export const updateBook = async (id: string, data: Partial<BookInput>) => {
  return await BookModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBook = async (id: string) => {
  return await BookModel.findByIdAndDelete(id);
};
