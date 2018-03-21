import mongoose, { Schema } from 'mongoose';

const Manga = new Schema({
  a: {type: String, required: true, max: 200}, //slug
  t: {type: String, required: true, max: 200}, //title
  c: [{type: Schema.ObjectId, ref: 'Category'}],  //category
  h: {type: Number}, // ???
  i: {type: String, required: true, max: 200}, // id Mangaeden Compliant ID
  im: {type: String, required: true, max: 200},
  ld: {type: Number},
  s: {type: Number},
});

export default mongoose.model('Manga', Manga);
