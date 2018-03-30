import mongoose, { Schema } from 'mongoose';

const Artist = new Schema({
  name: { type: String, required: true, max: 100 },
});

export default mongoose.model('Artist', Artist);
