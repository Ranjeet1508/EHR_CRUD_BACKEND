const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connection } = require('./config/db');
const { userRouter } = require('./Routers/userRouter');
const { patientRouter } = require('./Routers/patientRouter');


const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json());


app.use('/ehrUser', userRouter);
app.use('/ehrPatient', patientRouter)


app.listen(process.env.PORT, async() => {
    try {
        await connection
        console.log('server started at PORT 8080')
    } catch (error) {
        console.log(error)
    }
})
