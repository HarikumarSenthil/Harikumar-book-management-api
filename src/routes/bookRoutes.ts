import express, { Request, Response } from 'express';
import multer from 'multer'; 
import BookController from '../controllers/bookController';
import { importBooksFromCSV } from '../controllers/importController';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage }); 

const router = express.Router();

router.get('/books', BookController.getAllBooks as express.RequestHandler);
router.get('/books/:id', BookController.getBookById as express.RequestHandler);
router.post('/createbooks', BookController.createBook as express.RequestHandler);
router.put('/updatebook/:id', BookController.updateBook as express.RequestHandler);
router.delete('/deletebook/:id', BookController.deleteBook as express.RequestHandler);

router.post('/books/import', upload.single('file'), importBooksFromCSV as express.RequestHandler);

export default router;
