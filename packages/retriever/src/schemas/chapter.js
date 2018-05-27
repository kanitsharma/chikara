import mongoose, { Schema } from 'mongoose';

const Chapter = new Schema({
  images: [{ type: Schema.ObjectId, ref: 'Image' }],
  releaseDate: { type: Number }
});

export default mongoose.model('Chapter', Chapter);
