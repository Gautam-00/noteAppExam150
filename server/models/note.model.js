// Notes Schemaconst mongoose = require('mongoose');
import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    details: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Note = mongoose.model('Note', noteSchema);

  export default Note
  
 