import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);