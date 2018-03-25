import mongoose, { Schema } from 'mongoose';

const Chapter = new Schema({
  images: [{ type: Schema.ObjectId, ref: 'Image' }],
});

export default mongoose.model('Chapter', Chapter);
