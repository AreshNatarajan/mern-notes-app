const mongoose = require('mongoose')

const connection = () =>{
    mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log(`connected ${ con.connection.host}`);
    }).catch((err)=>{
        console.log(`error ${err.message}`);
    })
}
module.exports = connection;