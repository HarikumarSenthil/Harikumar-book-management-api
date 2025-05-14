import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import * as bookService from '../services/bookService';
import BookModel, { BookInput } from '../models/bookModel';

export const importBooksFromCSV = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'CSV file is required' });
  }

  const filePath = path.resolve(req.file.path);
  const books: BookInput[] = [];
  const errorRows: string[] = [];

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
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

      const missingFields: string[] = [];
      if (!title) missingFields.push('title');
      if (!author) missingFields.push('author');
      if (!publishedYearStr) missingFields.push('published year');

      if (missingFields.length > 0) {
        errorRows.push(
          `Row ${rowNumber}: Missing ${missingFields.join(', ')} field${missingFields.length > 1 ? 's' : ''}`
        );
        continue;
      }

      if (isNaN(publishedYear) || publishedYear < 0) {
        errorRows.push(`Row ${rowNumber}: Invalid published year`);
        continue;
      }

      books.push({ title, author, publishedYear });
    }

    await bookService.bulkAddBooks(books);
    fs.unlinkSync(filePath);

    res.status(200).json({
      addedBooksCount: books.length,
      errorRows,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error processing CSV', error: error.message });
  }
};


function normalizeRow(line: string): string[] {
  const values = line.split(',').map(value => value.trim());
  while (values.length < 3) values.push('');
  return values.slice(0, 3);
}
