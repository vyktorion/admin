import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  amount: number;
  fullName: string;
  userId: string;
  email: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be positive']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  userId: {
    type: String,
    required: [true, 'User ID is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'success', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);