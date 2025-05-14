import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

class BookController {
  getAllBooks = async (req: Request, res: Response) => {
    try {
      const books = await bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books'});
    }
  }

  getBookById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const book = await bookService.getBookById(id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching book'});
    }
  }

  createBook = async (req: Request, res: Response) => {
    try {
      const { title, author, publishedYear } = req.body;
      if (!title || !author || !publishedYear) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const newBook = await bookService.createBook({ title, author, publishedYear });
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: 'Error creating book' });
    }
  }

  updateBook = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedBook = await bookService.updateBook(id, req.body);
      if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: 'Error updating book'});
    }
  }

  deleteBook = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedBook = await bookService.deleteBook(id);
      if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting book'});
    }
  }
}

export default new BookController();
