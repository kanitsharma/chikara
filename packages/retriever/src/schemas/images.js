import mongoose, { Schema } from 'mongoose';

const Category = new Schema({
  t: {type: String, required: true, max: 100},
});

Category.virtual('a').get(_ => this.t.toLowerCase());

export default mongoose.model('Category', Category);
