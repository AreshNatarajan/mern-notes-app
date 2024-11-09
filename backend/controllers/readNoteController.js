const  myNoteModel =  require('../models/myNoteModel')

exports.readNoteController = async (req, res, next) =>{
  try {
   const readed = await myNoteModel.find();
   res.status(201).json({
      status : "success",
      data : readed,
   })
  } catch (error) {
   res.status(201).json({
      status : "failure",
      message : "connot get data "
   })
  }
}