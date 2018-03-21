import mongoose, { Schema } from 'mongoose';

const IMAGE_CDN = 'https://cdn.mangaeden.com/mangasimg/';

const Image = new Schema({
  hash: {type: String, required: true, max: 200},
  height: {type: Number},
  width: {type: Number}
});

Category.virtual('url').get(_ => IMAGE_CDN + this.hash);

export default mongoose.model('Image', Image);
