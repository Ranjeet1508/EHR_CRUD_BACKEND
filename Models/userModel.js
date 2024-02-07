const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {type: String, required:true},
    role: { 
        type: String, 
        required: true, 
        enum: ['doctor', 'other']
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {type: String, required: true}
})

const UserModel = mongoose.model('ehrUser', userSchema);

module.exports = {
    UserModel
}
