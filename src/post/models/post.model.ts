import { User } from './../../user/models/user.model';
import { Schema, Document } from 'mongoose';
import { Category } from './category.model';

const PostSchema = new Schema(
  {
    title: String,
    description: String,
    content: String,
    // created_at: { type: Date, required: true, default: Date.now },
    user: {
        type: Schema.Types.ObjectId,
        ref:"user"
    },
    tags: [String],
    numbers: [Number],  
  },
  {
    timestamps: true,
    // timestamps: {
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at',
    // },
    collection: 'posts',
  },
);

export { PostSchema };

export interface Post extends Document {
  title: string;
  description: string;
  content: string;
  user: User;
  tags: [String],
  numbers: [Number],
  categories: [Category];
}