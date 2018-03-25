import mongoose, { Schema } from 'mongoose';

const Artist = new Schema({
  first: { type: String, required: true, max: 100 },
  last: { type: String, required: true, max: 100 },
});

export default mongoose.model('Artist', Artist);
