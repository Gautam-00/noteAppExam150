import Notes from '../models/note.model.js';
export const setNotes =async (req,res)=>{
    // Create  setNotes function
    let note = req.body;
    note = new Notes(note);
    await note.save();
    console.log(note);
    res.status(200).send("Note saved");
}

export const getNotes = async (req,res)=>{
    // Create getNotes function
    let notes = await Notes.find();
    res.status(200).send(notes);
}

export const deleteNote = async (req,res)=>{
    // Create deleteNote function
    let id = req.params.id;
    await Notes.findByIdAndDelete(id);
    res.status(200).send("Note deleted");
}