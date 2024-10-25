import mongoose, {Model, Document, Schema} from 'mongoose';

export interface IFavoriteArticle {
    index: number;
    title: string;
}

export interface ILastArticles extends IFavoriteArticle {
    timestamp: number;
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    favoriteArticles: IFavoriteArticle[];
    lastArticles: ILastArticles[];
    index: number;
    role: string;
    registrationDate: number;
    avatar: string;
    googleId?: string;
}

const userSchema: Schema = new Schema({
                                          firstName: {
                                              type: String,
                                              required: true
                                          },
                                          lastName: {
                                              type: String,
                                              required: true
                                          },
                                          email: {
                                              type: String,
                                              required: true,
                                              unique: true,
                                          },
                                          //TODO Подумать над тем как все таки правильно сделать для OAuth
                                          password: {
                                              type: String,
                                              required: false
                                          },
                                          favoriteArticles: [
                                              {
                                                  index: {
                                                      type: Number,
                                                      required: true
                                                  },
                                                  title: {
                                                      type: String,
                                                      required: true
                                                  }
                                              }
                                          ],
                                          lastArticles: [
                                              {
                                                  index: {
                                                      type: Number,
                                                      required: true
                                                  },
                                                  title: {
                                                      type: String,
                                                      required: true
                                                  },
                                                  timestamp: {
                                                      type: Number,
                                                      required: true
                                                  }
                                              }
                                          ],
                                          index: {
                                              type: Number,
                                              required: true,
                                              unique: true
                                          },
                                          role: {
                                              type: String,
                                              enum: [
                                                  'user',
                                                  'admin'
                                              ],
                                              default: 'user'
                                          },

                                          registrationDate: {
                                              type: Number,
                                              required: true
                                          },
                                          avatar: {
                                              type: String,
                                              required: true

                                          },
                                          googleId: {
                                              type: String,
                                              required: false
                                          }
                                      });


const User: Model<IUser> = mongoose.model<IUser>('User', userSchema, 'users');

export default User;
