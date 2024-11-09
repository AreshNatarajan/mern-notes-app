const mongoose =  require('mongoose');

const mySchema = mongoose.Schema({
    title : String,
    content : String,
    category : String,
    finished : {type : Boolean, default : false},
    saveDate: { type: Date, default: Date.now },
    color : {
        type : String,
        default : 'F95454'
    }
});

const myModel  = mongoose.model('mynote', mySchema);

module.exports  = myModel