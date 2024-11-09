const myNoteModel =  require('../models/myNoteModel')

exports.createNoteController = async (req, res, next) =>{
  const data  = req.body;
  console.log(data);
  
  if( data.title === '') return res.status(201).json({
    status : 'failure',
    message : 'Title connot be empty'
  })

  if( data.category === '') return res.status(201).json({
    status : 'failure',
    message : ' Category connot be empty'
  })

  try {
    const created = await myNoteModel.create(data)
    res.status(200).json({
      status : "success",
      message : "Added Succefuly",
      data : created
    })
  } catch (error) {
    res.status(400).json({
      status : "failure",
      message : "insert failed",
      data : created
    })
  }
}