// routes/bookRoutes.ts
import express from 'express';
import BookController from '../controllers/bookController';
import { importBooksFromCSV } from '../controllers/importController';
import upload from '../middleware/uploadMiddleware';
const router = express.Router();

// Book Routes
router.get('/books', BookController.getAllBooks as express.RequestHandler);
router.get('/books/:id', BookController.getBookById as express.RequestHandler);
router.post('/books', BookController.createBook as express.RequestHandler);
router.put('/books/:id', BookController.updateBook as express.RequestHandler);
router.delete('/books/:id', BookController.deleteBook as express.RequestHandler);

// CSV Import Route
router.post('/books/import', upload.single('file'), importBooksFromCSV as express.RequestHandler);

export default router;
