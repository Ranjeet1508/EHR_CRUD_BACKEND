const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    gender: {type: String, enum: ['male', 'female', 'other'], required: true},
    contact_number: {type:String, required: true},
    address: {type:String, required:true},
    medical_history: { type: Boolean, required: true, enum: [true, false] },
    doctor_assigned: {type: String, required:true}   
})

const PatientModel = mongoose.model('ehrPatient', patientSchema);

module.exports = {
    PatientModel
}