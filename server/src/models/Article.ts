import mongoose, {Model, Document, Schema} from 'mongoose';

export interface IAuthor {
    index: number;
    name: string;
}

export interface IArticle extends Document {
    _id: mongoose.Types.ObjectId
    title: string;
    genres: Array<string>;
    content: string;
    index: number;
    publishedDate: number;
    estimatedReadingTime: number;
    characterCount: number;
    author: IAuthor;
}

const articleSchema: Schema = new Schema({
                                             title: {
                                                 type: String,
                                                 required: true
                                             },
                                             genres: {
                                                 type: [String],
                                                 required: true
                                             },
                                             content: {
                                                 type: String,
                                                 required: true
                                             },
                                             index: {
                                                 type: Number,
                                                 required: true
                                             },
                                             publishedDate: {
                                                 type: Number,
                                                 required: true
                                             },
                                             estimatedReadingTime: {
                                                 type: Number,
                                                 required: true
                                             },
                                             characterCount: {
                                                 type: Number,
                                                 required: true
                                             },
                                             author: {
                                                 index: {
                                                     type: Number,
                                                     required: true
                                                 },
                                                 name: {
                                                     type: String,
                                                     required: true
                                                 },
                                             }
                                         })


const Article: Model<IArticle> = mongoose.model<IArticle>('Article', articleSchema, 'stulchik');

export default Article;