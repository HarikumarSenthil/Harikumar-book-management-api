"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const bookController_1 = __importDefault(require("../controllers/bookController"));
const importController_1 = require("../controllers/importController");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
// Book routes using class-based controller
router.get('/books', bookController_1.default.getAllBooks);
router.get('/books/:id', bookController_1.default.getBookById);
router.post('/createbooks', bookController_1.default.createBook);
router.put('/updatebook/:id', bookController_1.default.updateBook);
router.delete('/deletebook/:id', bookController_1.default.deleteBook);
router.post('/books/import', upload.single('file'), importController_1.importBooksFromCSV);
exports.default = router;
