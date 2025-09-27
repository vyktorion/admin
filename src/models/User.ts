<<<<<<< HEAD
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
=======
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters'],
    maxlength: [50, 'Full name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    minlength: [10, 'Phone number must be at least 10 characters'],
    maxlength: [15, 'Phone number cannot exceed 15 characters']
  },
  address: {
    type: String,
    minlength: [2, 'Address must be at least 2 characters']
  },
  city: {
    type: String,
    minlength: [2, 'City must be at least 2 characters']
  },
  avatar: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
>>>>>>> 56221ebd398ad3233d9941407638a6c456af7347
