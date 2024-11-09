const  myNoteModel =  require('../models/myNoteModel')

exports.updateFinished = async (req, res, next) =>{
    const id  = req.params.id;
    const data  = req.body;
    try {
        const edited =  await myNoteModel.findByIdAndUpdate(id, data,  { new: true })
        res.status(201).json({
            status : "Success",
            message : `${edited.title} Updated`,
            data : edited
          })
    } catch (error) {
        res.status(400).json({
            status : "Failure",
            message : `${data.title} connot updated`,
            data : data
          })
    }
  
}