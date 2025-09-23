import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [60, 'Short description cannot exceed 60 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['T-shirts', 'Shoes', 'Accessories', 'Bags', 'Dresses', 'Jackets', 'Gloves']
  },
  sizes: [{
    type: String,
    enum: ['xs', 's', 'm', 'l', 'xl', 'xxl', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48']
  }],
  colors: [{
    type: String,
    enum: ['blue', 'green', 'red', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray', 'black', 'white']
  }],
  images: {
    type: Map,
    of: String,
    default: {}
  }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);