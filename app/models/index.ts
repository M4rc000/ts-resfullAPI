import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const conn = process.env.MONGO_URI;

if (!conn) {
  console.error('MongoDB connection string (conn) not found in environment variables.');
  process.exit(1);
}

mongoose
  .connect(conn)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// const ItemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: String,
//     required: true,
//   },
//   score: {
//     type: String,
//     required: true,
//   },
// });

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const ItemModel = mongoose.model('orders', ItemSchema);
