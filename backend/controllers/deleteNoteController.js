const  myNoteModel =  require('../models/myNoteModel')


exports.deleteNoteController = async (req, res, next) =>{
  const id  = req.params.id;
  try {
    const deleted = await myNoteModel.findByIdAndDelete(id)
    res.status(201).json({
      status : "Success",
      message : `${deleted.title} deleted`,
      data : deleted
    })
  } catch (error) {
      
      res.status(400).json({
      status : "Failure"
    })
  }
}