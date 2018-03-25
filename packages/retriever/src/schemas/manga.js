import mongoose, { Schema } from 'mongoose';

const Manga = new Schema({
  a: { type: String, required: true, max: 200 }, // slug
  t: { type: String, required: true, max: 200 }, // title
  artist: { type: Schema.ObjectId, ref: 'Artist' },
  cat: [{ type: Schema.ObjectId, ref: 'Category' }], // category
  created: { type: Number }, // created date
  description: { type: String },
  hits: { type: Number },
  image: { type: String },
  directImage: { type: String },
  chapters: [{ type: Schema.ObjectId, ref: 'Chapter' }],
  lastChapterDate: { type: Number },
  released: { type: Number },
  id: { type: String, required: true, max: 200 }, // id Mangaeden Compliant ID
  season: { type: Number },
});

export default mongoose.model('Manga', Manga);
