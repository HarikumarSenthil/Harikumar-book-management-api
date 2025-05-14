"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importBooksFromCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bookService = __importStar(require("../services/bookService"));
const importBooksFromCSV = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'CSV file is required' });
    }
    const filePath = path_1.default.resolve(req.file.path);
    const books = [];
    const errorRows = [];
    try {
        const data = fs_1.default.readFileSync(filePath, 'utf-8');
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        if (headers.join(',') !== 'title,author,publishedyear') {
            return res.status(400).json({ message: 'CSV headers must be: Title, Author, PublishedYear' });
        }
        for (let i = 1; i < lines.length; i++) {
            const row = normalizeRow(lines[i]);
            const rowNumber = i + 1;
            const [title, author, publishedYearStr] = row;
            const publishedYear = Number(publishedYearStr);
            const missingFields = [];
            if (!title)
                missingFields.push('title');
            if (!author)
                missingFields.push('author');
            if (!publishedYearStr)
                missingFields.push('published year');
            if (missingFields.length > 0) {
                errorRows.push(`Row ${rowNumber}: Missing ${missingFields.join(', ')} field${missingFields.length > 1 ? 's' : ''}`);
                continue;
            }
            if (isNaN(publishedYear) || publishedYear < 0) {
                errorRows.push(`Row ${rowNumber}: Invalid published year`);
                continue;
            }
            books.push({ title, author, publishedYear });
        }
        await bookService.bulkAddBooks(books);
        fs_1.default.unlinkSync(filePath);
        res.status(200).json({
            addedBooksCount: books.length,
            errorRows,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error processing CSV', error: error.message });
    }
};
exports.importBooksFromCSV = importBooksFromCSV;
function normalizeRow(line) {
    const values = line.split(',').map(value => value.trim());
    while (values.length < 3)
        values.push('');
    return values.slice(0, 3);
}
