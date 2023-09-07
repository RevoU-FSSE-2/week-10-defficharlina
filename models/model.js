const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: 
     {
        type: String,
        enum: ['superadmin', 'admin'],
        required: true
      }
})

/*const bioSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: Number,
    major: String
})*/

//module.exports = mongoose.model('User',userSchema);

const userData = mongoose.model('User', userSchema);
//const bioData = mongoose.model('Student Data', bioSchema);

module.exports = { userData };