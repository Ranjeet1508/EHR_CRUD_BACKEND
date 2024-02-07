const { Router } = require("express");
const {PatientModel} = require('../Models/patientModel')
const patientRouter = Router();


// Create (Add) Patient
patientRouter.post('/addPatients', async (req, res) => {
    try {
        const { name, age, gender, contact_number, address, medical_history, doctor_assigned } = req.body;
        const newPatient = new PatientModel({
            name,
            age,
            gender,
            contact_number,
            address,
            medical_history,
            doctor_assigned
        });
        await newPatient.save();
        res.status(201).json({
            success: true,
            message: 'Patient created successfully',
            patient: newPatient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Read (Retrieve) Patient
patientRouter.get('/getPatients/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const patient = await PatientModel.findOne({ name });
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        res.status(200).json({
            success: true,
            patient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

patientRouter.get('/patients/:id', async (req, res) => {
    try {
        const patient = await PatientModel.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        res.status(200).json({
            success: true,
            patient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});


patientRouter.get('/getAllPatients', async (req, res) => {
    try {
        let query = {};
        const searchName = req.query.searchName; // Get the search term from query parameters
        if (searchName) {
            // If search term is provided, create a case-insensitive regex pattern to match patient names
            query = { name: { $regex: new RegExp(searchName, 'i') } };
        }
        
        const patients = await PatientModel.find(query);
        res.status(200).json({
            success: true,
            patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});




// Update Patient Details
patientRouter.put('/updatePatients/:id', async (req, res) => {
    try {
        const updatedPatient = await PatientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Patient updated successfully',
            patient: updatedPatient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Delete Patient
patientRouter.delete('/deletePatients/:id', async (req, res) => {
    try {
        const deletedPatient = await PatientModel.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Patient deleted successfully',
            patient: deletedPatient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});





module.exports = {
    patientRouter
}