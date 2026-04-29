const notes = require("../models/notes");
const Notes = require("../models/notes")

exports.AddNotes = async (req,res)=>{
  try{
  const notes = new Notes(req.body);
  const saved = await notes.save();
  res.json(saved)
  }catch(err){
    res.status(500).json({error:err.message})
  }
}

exports.getNotes = async (req,res)=>{
  try{
    const notes = await Notes.find();
    res.json(notes) 

  }catch(error){
    res.status(500).json({error:error.message})
  }
}