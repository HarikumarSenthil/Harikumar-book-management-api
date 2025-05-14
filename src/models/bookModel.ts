import mongoose, { Document, Schema } from 'mongoose';

export interface BookInput {
  title: string;
  author: string;
  publishedYear: number;
}

export interface BookDocument extends BookInput, Document {}

const BookSchema = new Schema<BookDocument>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
});

export default mongoose.model<BookDocument>('Book', BookSchema); 